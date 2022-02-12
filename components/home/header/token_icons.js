import Tippy from '@tippyjs/react';
import { useEffect, useState } from 'react';
import 'tippy.js/dist/tippy.css';

export default function TokenIcons({...props}) {

    let icons = [];

    if (props.tokens) {
        props.tokens.forEach((token, index) => {
            icons.push(
            <div className="me-2" key={index}>
                <Tippy content={token.title} placement="bottom">
                    <img alt={token.title} 
                        data-token={token.symbol}
                        className="tokenIcon"
                        src={"/img/tokens/"+token.symbol.toLowerCase()+".png"}
                        style={{ height: 40 }} />
                </Tippy>
            </div>)
        });
    }

    return(
        <div className="mt-5 mt-lg-5 mt-xl-7">
            <h6 className="text-sm text-white opacity-7 mb-3">
                Compatible with:
            </h6>
            <div className="d-flex">
               {icons}
            </div>
        </div>
    )
}