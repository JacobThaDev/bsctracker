const Web3  = require("web3");
const web3  = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed1.binance.org:443"));
import axios from 'axios';

const safemoon_abi  = require("./abi/safemoon");
const dividends_abi = require("./abi/enh_dividends");

export const getBurned = async(token) => {
    let burn_wallet  = token.burn_wallet; // burn address
    return getBalance(token.contract, burn_wallet);
}

export const getBalance = async(token_addr, wallet_address) => {
    let contract = new web3.eth.Contract(safemoon_abi, token_addr);
    let balance  = await contract.methods.balanceOf(wallet_address).call();
    let decimals = await contract.methods.decimals().call();
    return (balance / 10 ** decimals);
}

export const getDividends = async(wallet_address) => {
    let token_addr = "0xd4a210030b71bb03fa85f8c72918078f1c185773";
    let contract   = new web3.eth.Contract(dividends_abi, token_addr);
    let balance    = await contract.methods.accumulativeDividendOf(wallet_address).call();
    let decimals   = 9;
    return (balance / 10 ** decimals);
}

export const formatNumber = (number, digits) => {
    return number.toLocaleString(undefined, { 
        minimumFractionDigits: digits
    });
}

export const getTxnList = async(symbol, wallet) => {
    let api_url = process.env.NEXT_PUBLIC_API_URL;
    let res = await axios.get(api_url+"/txns/"+symbol+"/"+wallet)
    return res.data;
}

export const getTokenStats = async(symbol) => {
    let api_url = process.env.NEXT_PUBLIC_API_URL;
    let res = await axios.get(api_url+"/token/"+symbol);
    return res.data;
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


export const getDivideBy = (number) => {
    if (number <= 100_000) {
        return 1;
    } else if (number <= 1_000_000) {
        return 100_000;
    } else if (number <= 1_000_000_000) {
        return 1_000_000;
    } else if (number <= 1_000_000_000_000) {
        return 1_000_000_000;
    } else if (number <= 1_000_000_000_000_000) {
        return 1_000_000_000_000;
    }
}

export const getSuffix = (number) => {
    if (number <= 1_000_000) {
        return "";
    } else if (number <= 1_000_000_000) {
        return "M";
    } else if (number <= 1_000_000_000_000) {
        return "B";
    } else if (number <= 1_000_000_000_000_000) {
        return "TR";
    } else if (number <= 1_000_000_000_000_000_000) {
        return "QD";
    }
}