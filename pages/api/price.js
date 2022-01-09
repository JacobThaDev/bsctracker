const Web3  = require("web3");
const web3  = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed1.binance.org:443"));
import axios from 'axios';

export default function handler(req, res) {
    res.status(200).json({ name: 'John Doe' })
  }
  