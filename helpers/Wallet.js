const Binance = require("./Binance");
const Token   = require("./Token");
const Web3    = require("web3");
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

    /*async getTxns() {
        try {
            let history = await Binance.getData({
                module: "account",
                action: "tokentx",
                address: this.address,
                endBlock: 'latest',
                sort: "desc"
            });

            if (history.error) {
                return txns;
            }

            let filtered = [];

            for(let txData of history) {
                let txn = new Txn(txData);
                filtered.push(txn);
            }

            return filtered;
        } catch (err) {
            return {
                error: err.message
            }
        }
    }

    async getTokenTxns() {
        try {
            let history = await Binance.getData({
                module: "account",
                action: "tokentx",
                contractAddress: this.token.contract,
                address: this.address,
                endBlock: 'latest',
                sort: "desc"
            });

            if (history.error) {
                return txns;
            }

            let filtered = [];

            for(let txData of history) {
                let txn = new Txn(txData);
                txn.direction = this.address && this.address.toLowerCase() == txn.to ? "in": "out";
                filtered.push(txn);
            }

            return filtered;
        } catch (err) {
            return {
                error: err.message
            }
        }
    }*/

}

module.exports = Wallet;