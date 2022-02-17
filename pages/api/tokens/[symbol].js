import axios from 'axios';
import * as Functions from '../../../functions';

const NodeCache = require( "node-cache" );
const cache     = new NodeCache();

export default async function handler(request, response) {
    let symbol = request.query.symbol;
    let tokens = require("../../../token_list");
    let token;
    
    let cached = cache.get("token-"+symbol.toLowerCase());

    if (cached) {
        return response.status(200).send(cached);
    }
    
    if (request.method != "GET") {
        return response.status(200).send({
            error: "This is available via GET only."
        });
    }

    for (let tkn of tokens) {
        if (tkn.symbol.toLowerCase() == symbol.toLowerCase()) {
            token = tkn;
        }
    }

    if (!token) {
        return response.status(200).send({
            error: "Token symbol not found: "+symbol
        });
    }

    token.supply      = await Functions.getTotalSupply(token);
    token.burned      = await Functions.getBurned(token);
    token.circulating = token.supply - token.burned;
    token.price       = await Functions.getTokenPrice(token);
    token.marketcap   = token.circulating * token.price;

    try {
        let bqdata = await axios('https://graphql.bitquery.io', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-API-KEY': process.env.bitquery_key
            },
            data: {
                query: "query ($network: EthereumNetwork!, $token: String!, $from: ISO8601DateTime, $till: ISO8601DateTime) { ethereum(network: $network) { transfers(currency: {is: $token} amount: {gt: 0} date: {since: $from, till: $till} ) { currency { symbol } median: amount(calculate: median) average: amount(calculate: average) amount count days: count(uniq: dates) sender_count: count(uniq: senders) receiver_count: count(uniq: receivers) min_date: minimum(of: date) max_date: maximum(of: date)}}}",
                variables: {
                    "limit": 10,
                    "offset": 0,
                    "network": "bsc",
                    "token": token.contract
                }
            }
        });

        let json = bqdata.data.data.ethereum.transfers[0];
        token.holders   = json.receiver_count;
        token.transfers = json.count;
    } catch(err) {
        
    }

    token.last_update = new Date().getTime();
    cache.set("token-"+symbol.toLowerCase(), token, 300);
    return response.status(200).send(token);
}