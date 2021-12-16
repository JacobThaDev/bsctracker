const Web3  = require("web3");
const web3  = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed1.binance.org:443"));
import axios from 'axios';

const config = require("/config.js");

export const timestampToDate = (timestamp) => {
    let date  = new Date(timestamp * 1000);
    return date.toLocaleDateString()+ ' '+date.toLocaleTimeString();
}

/**
 * Grab price directly from the blockchain using BitQuery API
 * @returns array
 */
export const getTokenData = async() => {
    try {
        let baseToken = config['address'];

        let res = await axios('https://api.dex.guru/v1/tokens/'+baseToken+'-bsc', {
             method: 'GET',
             headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0',
             }
        });

        return res.data;
    } catch (err) {
        console.log(err);
        return 0;
    }
}

export const getBalance = async(wallet_address, formatNumber = false) => {
    var contract = new web3.eth.Contract(config['abi'], config['address']);
    var balance  = await contract.methods.balanceOf(wallet_address).call();
    var decimals = await contract.methods.decimals().call();
    
    let formatted = balance / 10 ** decimals;

    if (formatNumber) {
        let parts = formatted.toFixed(6).split(".");
        let part1 = insertCommas(parts[0]);
        let part2 = parts[1];

        return part1 + "." + part2;
    }
    return formatted;
}

export const getTxns = async(address) => {
    let contract = config['address']; // contract address
    let api_key  = config['bscscan_key'];
    let api_url  = "https://api.bscscan.com/api?module=account&action=tokentx&contractaddress="+contract+"&address="+address+"&offset=10000&sort=asc&apikey="+api_key;

    let buys     = [];
    let sells    = [];

    try {
        let txns   = await axios.get(api_url);
        let result = txns.data.result;

        for (let i = 0; i < result.length; i++) {
            let txn = result[i];

            if (typeof txn.from == "undefined") {
                continue;
            }

            let to_addr   = txn.to;
            
            if (to_addr.toLowerCase() == address.toLowerCase()) {
                buys.push(txn);
            } else {
                sells.push(txn);
            }
        }

        return {
            buys: buys, 
            sells: sells,
            original: result
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

/**
 * Add commas to an integer value
 * @param {*} x 
 * @returns 
 */
 export const insertCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}