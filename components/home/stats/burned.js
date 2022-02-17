import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

import * as Functions from "../../../functions";
import FontIcon from "../../global/fonticon";

export default function Burned({...props}) {

    const [loaded, setLoaded] = useState(false);
    const [data, setData] = useState(null);

    useEffect(async() => {
        if (!props.data) {
            setLoaded(false);
            return;
        }
        
        let supply      = props.data.supply;
        let circulating = props.data.circulating;
        let burned      = props.data.burned;

        let divideBy = Functions.getDivideBy(burned);
        let suffix   = Functions.getSuffix(burned);

        setData({
            burned: burned / divideBy,
            circulating: circulating / divideBy,
            supply: supply,
            divideby: divideBy,
            suffix: suffix
        });

        setLoaded(true);
    }, [props.data]);

    let icon = <FontIcon icon="spinner" type="fad" pulse={true}/>;

    return(
        <Card className="border-0 shadow-sm  mb-3">
            <Card.Body>
                <div className="d-flex">
                    <div className="w-100">
                        <p className="text-uppercase text-muted mb-0 small-text">
                            Burned
                        </p>
                        <span className="h4 font-weight-bold mb-0 text-danger">
                            {!loaded
                                ? icon 
                                : Functions.formatNumber(data.burned, 3) + data.suffix
                            }
                        </span>
                    </div>
                    <div className="pe-3">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            
                            <FontIcon icon="fire" type="fad" size="lg" />
                        </div>
                    </div>
                </div>
            </Card.Body>
            <Card.Footer className="border-0 bg-transparent pt-0 text-muted small">
                {!loaded ? icon : Functions.formatNumber(data.circulating, 3) + data.suffix} Circulating
            </Card.Footer>
        </Card>
    )
}