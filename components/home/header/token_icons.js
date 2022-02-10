import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

export default function TokenIcons() {

    return(
        <div className="mt-5 mt-lg-5 mt-xl-7">
            <h6 className="text-sm text-white opacity-7 mb-3">
                Compatible with:
            </h6>
            <div className="d-flex">
                <div className="me-2">
                    <Tippy content="SafeMoon v2" placement="bottom">
                    <img alt="SafeMoon v2"
                        src="https://safemoon.net/img/logo.svg" 
                        style={{ height: 40 }} />
                    </Tippy>
                </div>
                <div className="me-2">
                    <Tippy content="Enhance" placement="bottom">
                        <img alt="Enhance" 
                            src="/img/enhance.png" 
                            style={{ height: 40 }} />
                    </Tippy>
                </div>
                <div className="me-2">
                    <Tippy content="Glow v2" placement="bottom">
                        <img alt="Glow v2" 
                            src="/img/glowv2.png" 
                            style={{ height: 40 }} />
                    </Tippy>
                </div>
                <div className="me-2">
                    <Tippy content="EverGrow Coin" placement="bottom">
                        <img alt="EverGrow Coin" 
                            src="/img/evergrow.png" 
                            style={{ height: 40 }} />
                    </Tippy>
                </div>
            </div>
        </div>
    )
}