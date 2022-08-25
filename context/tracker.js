import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import Wallet from '../helpers/Wallet';
import api from "../services/api";

const Web3  = require("web3");
const web3  = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed1.binance.org:443"));
const TrackerContext = createContext();

const tokenList = require("../tokens");

export function TrackerProvider({ children }) {

    const [ active, setActive ]   = useState(null);
    const [ tokens, setTokens ]   = useState(null);
    const [ pairId, setPairId ]   = useState(0);
    const [ error, setError ]     = useState(null);
    const [ txnData, setTxnData ] = useState(null);
    const [ time, setTime ]       = useState("h24");
    const [ loading, setLoading ] = useState(true);
    const [ price, setPrice ]     = useState(0);
    const [ burned, setBurned ]   = useState(0);
    const [ supply, setSupply ]   = useState(0);
    const [ circulating, setCirculating ] = useState(0);

    useEffect(() => {
        updateTokenList();
    }, []);

    useEffect(() => {
        if (!active) {
            return;
        }

        updateTxnData();
        updateSupplyStats();
    }, [active]);

    const refreshData = async() => {
        await updateTokenList();
    }

    const getRealTimePrice = async() => {

    }

    const updateTokenList = async() => {
        let list      = [];
        let tokenData = tokenList;

        for (let i = 0; i < tokenData.length; i++) {
            list.push(tokenData[i].contract);
        }

        let pairs = await api.get("tokens/"+list.join(","))
            .then(res => res.data.pairs);

        let filtered = [];

        for (let i = 0; i < tokenData.length; i++) {
            let token   = tokenData[i];
            token.pairs = [];

            for (let p = 0; p < pairs.length; p++) {
                if (pairs[p].baseToken.address.toLowerCase() === tokenData[i].contract.toLowerCase()) {
                   token.pairs.push(pairs[p]);
                }
            }

            filtered.push(token);
        }

        // loop through each token
        for (let i = 0; i < filtered.length; i++) {
            let token = filtered[i];

            // if there's no pairs, then we skip.
            if (!token.pairs || token.pairs.length === 0) {
                continue;
            }

            filtered[i].bestPair = token.pairs[0];

            // then loop trough each pair of the token to get the best price.
            for (let p = 0; p < token.pairs.length; p++) {
                let pair = token.pairs[p];

                if (pair.priceUsd > filtered[i].bestPair.priceUsd) {
                    filtered[i].bestPair = pair;
                }
            }
        }

        setTokens(filtered);

        if (!active)
            setActive(filtered[0]);
    }

    const getTimeName = () => {
        if (time === "h24")
            return "24h";
        if (time === "h6")
            return "6h";
        if (time === "h1")
            return "1h";
        if (time === "m5")
            return "5m";
        return "";
    }

    const changeTime = (key) => {
        setTime(key.currentKey)
    }

    const updateTxnData = async() => {
        setTxnData(null);
        let res = await axios.get("/api/token/txns/"+active.contract).then(res => res.data);
        setTxnData(res);
    }

    const updateSupplyStats = async() => {
        setSupply(null);
        setBurned(null);
        setCirculating(null);

        let supply = await getSupply();
        let burned = await getBurned();
        let circulating = supply - burned;

        setSupply(supply);
        setBurned(burned);
        setCirculating(circulating);
    }

    const getSupply = async() => {
        let mini_abi = require("../abi/mini_abi");
        let contract = new web3.eth.Contract(mini_abi, active.contract);
        let supply   = await contract.methods.totalSupply().call();
        let decimals = await contract.methods.decimals().call();
        return parseInt(supply) / 10 ** decimals;
    }

    const getBurned = async() => {
        if (!active.canBurn) {
            return 0;
        }

        let wallet = new Wallet(active.contract, active.burn_wallet);
        return wallet.getBalance();
    }

    return (
        <TrackerContext.Provider
            value={{
                tokens, setTokens, active, setActive, txnData, setTxnData, time, setTime,
                loading, pairId, setPairId, supply, circulating, burned, tokenList,
                getTimeName, changeTime, refreshData, price, setPrice
            }}>
            {children}
        </TrackerContext.Provider>
    );

}

export const useTracker = () => useContext(TrackerContext);