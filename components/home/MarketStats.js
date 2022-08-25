import { Button, Text, Card } from "@nextui-org/react";
import { useTracker } from "../../context/tracker";
import SvgIcon from "../global/SvgIcon";
import MarketHeader from "./market/header";
import MarketInfo from "./market/info";
import MarketCap from "./market/mcap";
import MarketPrice from "./market/price";
import MarketSupply from "./market/supply";
import MarketVolume from "./market/volume";
import MarketLiquidity from "./market/liquidity";

export default function MarketStats() {

    const { active } = useTracker();

    return(
        <>
            { active.pairs.length == 0 &&
            <Card css={{ px: "1rem", mb: 20, color: "$error" }} variant={""}>
                <Card.Body>
                    There token does not have any trades within the last 24 hours and some data may not display.
                </Card.Body>
            </Card>}

        <Card css={{ p: "1rem", mb: 20 }} variant="" className="fancy-card">
            <MarketHeader/>
            
            <Card.Body>
                <div className="row" style={{ marginBottom: 30 }}>
                    <div className="col-12 col-lg-6">
                        <MarketInfo/>
                    </div>
                    <div className="col-12 col-lg-6">
                        <MarketPrice/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6 col-xl-3">
                         <MarketCap/>
                    </div>

                    <div className="col-12 col-md-6 col-xl-3">
                        <MarketVolume/>
                    </div>

                    <div className="col-12 col-md-6 col-xl-3">
                        <MarketLiquidity/>
                    </div>

                    <div className="col-12 col-md-6 col-xl-3">
                        <MarketSupply/>
                    </div>
                </div>
            </Card.Body>
        </Card>
        </>
    )

}