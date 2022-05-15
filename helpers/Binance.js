const axios = require("axios");
const Web3  = require("web3");
const web3  = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed1.binance.org:443"));

class Binance {

    static async getBnbPrice() {
        try {
            let aggr = require("../abi/aggregator");
            let addr = "0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE";
            let feed = new web3.eth.Contract(aggr, addr);
    
            let round    = await feed.methods.latestRoundData().call();
            let decimals = await feed.methods.decimals().call();
            let rounded  = (round[1] / 10 ** decimals).toFixed(2)
            return parseFloat(rounded);
        } catch(err) {
            return 0;
        }
    }

    static async getPrice() {
        try {
            let price = await Binance.getData({
                module: "stats",
                action: "bnbprice"
            });
            return parseFloat(price.ethusd);
        } catch (err) {
            return null;
        }
    }

    static async getData(params) {
        params.apikey = process.env.binance_key;

        try {
            let request = await axios("https://api.bscscan.com/api", {
                method: 'GET',
                timeout: 1000 * 60,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                params: params
            });

            let status  = parseInt(request.data.status);
            let message = request.data.message;

            if (status == 0) {
                return {
                    error: message
                };
            }
            
            return request.data.result;
        } catch (err) {
            return {
                error: err.message
            }
        }
    }

}

module.exports = Binance;