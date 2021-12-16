import React, { Component } from 'react';

export default class Header extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <>
                <h3 className="mb-0">SafeMoon v2 Wallet Tracker</h3>
                <p className="small text-muted">
                    To track your reflections, either enter your wallet 
                    address manually, or connect your wallet to grab 
                    your address automatically.
                </p>
            </>
        );
    }
}