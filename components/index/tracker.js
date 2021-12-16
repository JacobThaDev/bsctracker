import { Component } from "react";
import { Card } from "react-bootstrap";

import * as Functions from '../../functions';
import axios from 'axios';

export default class Tracker extends Component {

    refreshTime = 5000;
    lastBalance = 0;
    interval = null;

    async componentDidMount() {
        if (this.props.address) {
            let address        = this.props.address;
            let wallet_balance = await Functions.getBalance(address);
            this.lastBalance   = wallet_balance;

            // if no tokens, display error
            if (wallet_balance == 0) {
                this.setError("You do not have any token!");
                return;
            }

            this.setState({ 
                balance: wallet_balance, 
                difference: 0,
                error: null
            });

            console.log("balance", wallet_balance);

            let comp = this;

            this.interval = setInterval(async function() {
                let balance     = await Functions.getBalance(address);
                let difference  = (balance - comp.lastBalance);

                let txnList     = await comp.getTxns(address);
                let reflections = 0;

                if (txnList.buys.length != 0) {
                    let received = comp.getTotal(txnList.buys);
                    let sold     = 10 * comp.getTotal(txnList.sells) / 9;
                    reflections  = Math.abs(balance - (received - sold));
                }

                comp.setState({
                    balance: balance,
                    difference: difference > 0 ? difference.toFixed(9) : 0,
                    reflections: reflections
                });

                comp.lastBalance = balance;
            }, this.refreshTime);// update every 1000ms, or 1sec
        }

        console.log(this.props.address);
    }

    getTotal = (array) => {
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

    async getTxns(address) {
        let contract = "0x42981d0bfbaf196529376ee702f2a9eb9092fcb5"; // contract address
        let api_key  = "CKKPW7KJVD2T9I81H2A5K1SZ5YGVH4ZMI1";
        let api_url  = "https://api.bscscan.com/api?module=account&action=tokentx&contractaddress="+contract+"&address="+address+"&offset=10000&sort=asc&apikey="+api_key;
    
        let buys     = [];
        let sells    = [];

        try {
            let txns   = await axios.get(api_url);
            let result = txns.data.result;

            for (let i = 0; i < result.length; i++) {
                let txn = result[i];

                if (typeof txn.from == "undefined") {
                    continue;
                }

                let to_addr   = txn.to;
                
                if (to_addr.toLowerCase() == address.toLowerCase()) {
                    buys.push(txn);
                } else {
                    sells.push(txn);
                }
            }

            return {
                buys: buys, 
                sells: sells,
                original: result
            };
        } catch (err) {
            console.log(err);
            return {
                buys: [], 
                sells: [],
                original: []
            };
        }
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    render() {
        let 
            load_icon   = <i className="fal fa-spinner fa-pulse"></i>,
            balance     = load_icon, 
            difference  = load_icon, 
            reflections = load_icon;

        if (this.state && this.state.balance) 
            balance = this.state.balance.toLocaleString(undefined, { minimumFractionDigits: 9 })
        if (this.state && this.state.reflections)
            reflections = this.state.reflections.toLocaleString(undefined, { minimumFractionDigits: 9 });
        
        return (<>
           <Card className="text-center">
                <Card.Body>
                    <h3 className="mb-0">
                        Wallet Tracker
                    </h3>

                    <p className="small text-muted">
                        Your balance and reflections
                    </p>

                    <hr/>

                    <p className="mb-0">{balance}</p>
                    <p className="small text-muted">Tokens</p>

                    <p className="mb-0">{reflections}</p>
                    <p className="small text-muted">Earnings (Lifetime)</p>

                    <p className="mb-0">$0.00</p>
                    <p className="small text-muted">Value</p>
                    
                </Card.Body>
            </Card>
            <p className="small text-center text-muted">
                Updates automatically every {this.refreshTime/1000} seconds
            </p>
        </>);
    }
}