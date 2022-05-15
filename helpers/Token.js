const { default: axios } = require("axios");
const Web3      = require("web3");
const Wallet    = require("./Wallet");
const web3      = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed1.binance.org:443"));

class Token {

    static async getPoolPrice(token, pool_address, bnb_price) {
        let wbnb_addr  = "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c";

        let wallet1 = new Wallet(wbnb_addr, pool_address);
        let wallet2 = new Wallet(token.contract, pool_address);

        let pool_wbnb  = await wallet1.getBalance();
        let pool_token = await wallet2.getBalance();

        let pool_price = pool_wbnb / pool_token * bnb_price;
        return parseFloat(pool_price.toFixed(12));
    }

    static async getLiquidity(token, pool_address) {
        let wbnb_addr  = "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c";

        let wallet1 = new Wallet(wbnb_addr, pool_address);
        let wallet2 = new Wallet(token.contract, pool_address);

        let pool_wbnb  = await wallet1.getBalance();
        let pool_token = await wallet2.getBalance();

        return {
            wbnb: pool_wbnb,
            token: pool_token
        }
    }

    static async getSupply(token) {
        let mini_abi = require("../abi/mini_abi");
        let contract = new web3.eth.Contract(mini_abi, token.contract);
        let supply   = await contract.methods.totalSupply().call();
        let decimals = await contract.methods.decimals().call();
        return parseInt(supply) / 10 ** decimals;
    }

    static async getHolders(token) {
        return await axios('https://graphql.bitquery.io', {
            method: 'POST',
            timeout: 1000 * 10,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-API-KEY': "BQYL83K930N4bLE65pJfZTPBe7cPUXPT"
            },
            data: {
                query: "query ($network: EthereumNetwork!, $token: String!, $from: ISO8601DateTime, $till: ISO8601DateTime) { ethereum(network: $network) { transfers(currency: {is: $token} amount: {gt: 0} date: {since: $from, till: $till} ) { currency { symbol } median: amount(calculate: median) average: amount(calculate: average) amount count days: count(uniq: dates) sender_count: count(uniq: senders) receiver_count: count(uniq: receivers) }}}",
                variables: {
                    "limit": 10,
                    "offset": 0,
                    "network": "bsc",
                    "token": token.contract
                }
            }
        });
    }

    static async getBurned(token) {
        if (!token.canBurn) {
            return 0;
        }
        let wallet = new Wallet(token.contract, token.burn_wallet);
        return wallet.getBalance();
    }

    static async getDecimals(address) {
        let mini_abi = require("../abi/mini_abi");
        let contract = new web3.eth.Contract(mini_abi, address);
        let decimals = await contract.methods.decimals().call();
        return parseInt(decimals);
    }

}

module.exports = Token;