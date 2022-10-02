import axios from "axios";

const NodeCache = require("node-cache");
const myCache   = new NodeCache();

export default async function handler(request, response) {
    let { contract } = request.query;

    let data = myCache.get(contract);

    if (data) {
        return response.status(200).send(data);
    }

    try {
        let res = await axios('https://graphql.bitquery.io', {
            method: 'POST',
            timeout: 1000 * 10,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-API-KEY': process.env.BITQUERY_KEY
            },
            data: {
                query: "query ($network: EthereumNetwork!, $token: String!, $from: ISO8601DateTime, $till: ISO8601DateTime) { ethereum(network: $network) { transfers(currency: {is: $token} amount: {gt: 0} date: {since: $from, till: $till} ) { currency { symbol } median: amount(calculate: median) average: amount(calculate: average) amount count days: count(uniq: dates) sender_count: count(uniq: senders) receiver_count: count(uniq: receivers) }}}",
                variables: {
                    "limit": 10,
                    "offset": 0,
                    "network": "bsc",
                    "token": contract
                }
            }
        });

        data = res.data.data.ethereum.transfers[0];
        myCache.set(contract, data, 600);
        
        return response.status(200).send(data);
    } catch (err) {
        return response.status(200).send({ error: err });
    }
    

}