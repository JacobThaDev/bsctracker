import axios from 'axios';

const Moralis = require('moralis/node');

export default async function handler(request, response) {
    let address = request.query.address;

    try {
        let server = process.env.moralis_server;
        let app_id = process.env.moralis_app_id;

        await Moralis.start({ serverUrl: server, appId: app_id });

        const options = {
            chain: "BSC",
            address: address
        };
    
        let collection = await Moralis.Web3API.account.getNFTs(options);
        let parsed = [];

        collection.result.forEach(async(nft) => {
            if (!nft.is_valid) 
                return;

            if (nft.metadata) {
                let metadata = JSON.parse(nft.metadata);
                let image = metadata.image;
               
                if (image) {
                    if (image.substring(0,7) == "ipfs://") {
                        nft.image = image.replace("ipfs://", "https://ipfs.io/ipfs/");
                    } else {
                        nft.image = image;
                    }
                }
                nft.metadata = metadata;
            }
            
            if (!nft.image) {
                nft.image = "/img/placeholder.jpg"
            }
            parsed.push(nft);
        });

        return response.status(200).json(parsed);
    } catch(err) {
        console.log(err);
    }
}
