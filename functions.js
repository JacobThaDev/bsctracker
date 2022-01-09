const Web3  = require("web3");
const web3  = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed1.binance.org:443"));
import axios from 'axios';

const contract_abi   = require("./contract.js");
const token_address  = process.env.NEXT_PUBLIC_ADDRESS;
const v1_address     = process.env.NEXT_PUBLIC_V1ADDRESS;
/**
 * Grab price directly from the blockchain using BitQuery API
 * @returns array
 */
 export const getTokenData = async() => {
    try {
        let res = await axios.get('https://api.bsctracker.net/price');
        return res.data;
    } catch (err) {
        console.log(err);
        return 0;
    }
}

export const getBurned = async() => {
    let burn_wallet  = "0x0000000000000000000000000000000000000001"; // burn address
    return getBalance(burn_wallet);
}

export const getv1Balance = async(wallet_address) => {
    let contract = new web3.eth.Contract(contract_abi, v1_address);
    let balance  = await contract.methods.balanceOf(wallet_address).call();
    let decimals = await contract.methods.decimals().call();
    return (balance / 10 ** decimals);
}


export const getBalance = async(wallet_address) => {
    let contract = new web3.eth.Contract(contract_abi, token_address);
    let balance  = await contract.methods.balanceOf(wallet_address).call();
    let decimals = await contract.methods.decimals().call();
    return (balance / 10 ** decimals);
}

export const getPrice = async() => {
    let res = await axios.get('https://api.bsctracker.net/price');
    return res.data;
}

export const getStats = async() => {
    try {
        let res = await axios('https://graphql.bitquery.io', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-API-KEY': process.env.NEXT_PUBLIC_BITQUERY
            },
            data: {
                query: "query ($network: EthereumNetwork!, $token: String!, $from: ISO8601DateTime, $till: ISO8601DateTime) { ethereum(network: $network) { transfers(currency: {is: $token} amount: {gt: 0} date: {since: $from, till: $till} ) { currency { symbol } median: amount(calculate: median) average: amount(calculate: average) amount count days: count(uniq: dates) sender_count: count(uniq: senders) receiver_count: count(uniq: receivers) min_date: minimum(of: date) max_date: maximum(of: date)}}}",
                variables: {
                    "limit": 10,
                    "offset": 0,
                    "network": "bsc",
                    "token": process.env.NEXT_PUBLIC_ADDRESS
                }
            }
        });

        return res.data.data.ethereum.transfers[0];
    } catch (err) {
        console.log(err)
    }
}


export const getTxns = async(address) => {
    let api_url  = "https://api.bsctracker.net/wallet/"+address+"/txns";
    let buys     = [];
    let sells    = [];

    try {
        let txns = await axios.get(api_url);
        let data = txns.data;

        for (let i = 0; i < data.length; i++) {
            let txn = data[i];

            if (typeof txn.from == "undefined") {
                continue;
            }
            
            if (txn.type == "buy") {
                buys.push(txn);
            } else {
                sells.push(txn);
            }
        }

        return {
            buys: buys, 
            sells: sells,
            original: data
        };
    } catch (err) {
        console.log(err);
        return {
            buys: [], 
            sells: [],
            original: []
        };
    }
}

export const getTotal = (array) => {
    if (typeof array == "undefined" || array.length == 0) {
        return 0;
    }

    let total = 0;

    for (let i = 0; i < array.length; i++) {
        let txn = array[i];
        let amt = parseFloat(txn.value/1000000000);
        total += amt;
    }

    return total;
}

export const formatNumber = (number, digits) => {
    return number.toLocaleString(undefined, { 
        minimumFractionDigits: digits
    });
}