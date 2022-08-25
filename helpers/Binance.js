const axios = require("axios");
const Web3  = require("web3");
const web3  = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed1.binance.org:443"));
const aggr  = require("../abi/aggregator");

class Binance {

    static async getBnbPrice() {
        try {
            let addr = "0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE";
            let feed = new web3.eth.Contract(aggr, addr);

            let round = await feed.methods.latestRoundData().call();
            let decimals = await feed.methods.decimals().call();
            let rounded = (round[1] / 10 ** decimals).toFixed(2)
            return parseFloat(rounded);
        } catch (err) {
            return 0;
        }
    }
}

module.exports = Binance;