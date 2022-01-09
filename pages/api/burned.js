const Web3  = require("web3");
const web3  = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed1.binance.org:443"));
import axios from 'axios';

export default async(req, res) => {
    let contract_abi = require("../../contract.js");
    let burn_wallet  = "0x0000000000000000000000000000000000000001"; // burn address

    var contract = new web3.eth.Contract(contract_abi, process.env.NEXT_PUBLIC_ADDRESS);
    var balance  = await contract.methods.balanceOf(burn_wallet).call();
    var decimals = await contract.methods.decimals().call();
    
    balance = (balance / 10 ** decimals);

    res.status(200).json({ balance: balance })
}