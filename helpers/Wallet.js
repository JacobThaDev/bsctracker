const Web3    = require("web3");
const axios = require("axios");
const web3    = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed1.binance.org:443"));

class Wallet {

    constructor(token, address) {
        this.token   = token;
        this.address = address;
    }

    async getBalance() {
        let call = await new web3.eth.call({
            to: this.token, // contract address
            data: "0x70a08231000000000000000000000000"+this.address.replace("0x", "")
        });

        let decimals = await this.getDecimals(this.token);
        return parseInt(call) / 10 ** decimals;
    }

    async getTokenBalance(tokenAddress) {
        let call = await new web3.eth.call({
            to: tokenAddress, // contract address
            data: "0x70a08231000000000000000000000000"+this.address.replace("0x", "")
        });

        let decimals = await this.getDecimals(tokenAddress);
        return parseInt(call) / 10 ** decimals;
    }

    async getBalanceAtBlock(block, decimals) {
        let call = await new web3.eth.call({
            to: this.token, // contract address
            block: block,
            data: "0x70a08231000000000000000000000000"+this.address.replace("0x", "")
        });
        return parseInt(call) / 10 ** decimals;
    }

    async getDecimals(address) {
        let mini_abi = require("../abi/mini_abi");
        let contract = new web3.eth.Contract(mini_abi, address);
        let decimals = await contract.methods.decimals().call();
        return parseInt(decimals);
    }

    async getTransactions() {
        try {
            let txns = await axios.get("https://api.bscscan.com/api", {
                params: {
                    module: "account",
                    action: "tokentx",
                    sort: "DESC",
                    address: this.address,
                    apikey: "TPGGDVDWGJM6D7FF6FZ3K8AF67IFS5F9MB"
                }
            }).then(response => response.data);

            if (txns.status === 0) {
                return [];
            }

            return txns.result;
        } catch (err) {
            return null;
        }
    }

}

module.exports = Wallet;