import React, { Component, Fragment } from 'react';
import { Card } from 'react-bootstrap';

export default class Footer extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <div className="text-center">
                <p className="mb-0">
                    <a href="https://discord.gg/5BejZeDxWx" className="d-inline-block" 
                        target="_blank" rel="nofollow noopener">
                        <i className="fab fa-discord fa-lg fa-fw"></i>
                    </a>
                    <a href="https://github.com/OGKingFox/sfmv2-tracker" className="d-inline-block"
                        target="_blank" rel="nofollow noopener">
                        <i className="fab fa-github fa-lg fa-fw"></i>
                    </a>
                    <a href="https://twitter.com/OG_KingFox" className="d-inline-block"
                        target="_blank" rel="nofollow noopener">
                        <i className="fab fa-twitter fa-lg fa-fw"></i>
                    </a>
                </p>

                <p className="text-muted small mb-0">Created by OGKingFox</p>
            </div>
        );
    }
}