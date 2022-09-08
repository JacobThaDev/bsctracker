import bscscan from "../../../../services/bscscan";

const NodeCache = require("node-cache");
const myCache   = new NodeCache();

export default async function handler(request, response) {
    let { wallet } = request.query;

    let data = myCache.get(wallet.toLowerCase());

    if (!data) {
        try {
            data = await bscscan.get("/", {
                params: {
                    module: "account",
                    action: "tokentx",
                    sort: "DESC",
                    address: wallet,
                    apikey: "TPGGDVDWGJM6D7FF6FZ3K8AF67IFS5F9MB"
                }
            }).then(res => res.data.result);

            myCache.set(wallet.toLowerCase(), data, 300);
        } catch (err) {
            console.log(err);
            return response.status(200).send([]);
        }
    }

    return response.status(200).send(data);
}