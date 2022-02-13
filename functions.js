const Web3  = require("web3");
const web3  = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed1.binance.org:443"));

const { formatDuration, intervalToDuration } = require("date-fns");

export const getRelTime = (date) => {
    return formatDuration(intervalToDuration({
        start: date,
        end: new Date()
    }), {
        format: ['years', 'months', 'days', 'hours', 'minutes']
    });
}

export const shortenAddress = (address) => {
    let start = address.substring(0, 2);
    let end   = address.substring(address.length, address.length - 4);
    return start+"..."+end;
}

export const getTotalSupply = async(token) => {
    let mini_abi = require("./abi/mini_abi");
    let contract = new web3.eth.Contract(mini_abi, token.contract);
    let supply   = await contract.methods.totalSupply().call();
    let decimals = await contract.methods.decimals().call();
    return parseInt(supply) / 10 ** decimals;
}

export const getBurned = async(token) => {
    let burn_wallet  = token.burn_wallet; // burn address
    return getBalance(token.contract, burn_wallet);
}

export const getTokenPrice = async(token) => {
    let wbnb = "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c";

    let wbnb_balance  = await getBalance(wbnb, token.liquidity);
    let token_balance = await getBalance(token.contract, token.liquidity);
    let bnb_price     = await getBnbPrice();

    return (wbnb_balance / token_balance * bnb_price);
}

export const getBalance = async(token, wallet) => {
    let call = await new web3.eth.call({
        to: token, // contract address
        data: "0x70a08231000000000000000000000000"+wallet.replace("0x", "")
    });
    let decimals = await getDecimals(token);
    return parseInt(call) / 10 ** decimals;
}

export const getDecimals = async(address) => {
    let mini_abi = require("./abi/mini_abi");
    let contract = new web3.eth.Contract(mini_abi, address);
    let decimals = await contract.methods.decimals().call();
    return decimals;
}


export const getBnbPrice = async() => {
    try {
        let aggr = require("./abi/aggregator");
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

export const formatNumber = (number, digits) => {
    return number.toLocaleString(undefined, { 
        minimumFractionDigits: digits
    });
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