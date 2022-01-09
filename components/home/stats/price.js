import { Card } from "react-bootstrap";
import FontIcon from "../../global/fonticon";
import ChartCard from "./chart";

export default function PriceCard({ ... props}) {

    return(<>
    <Card className="shadow mb-3" style={{position: 'relative'}}>
        <Card.Body>
            <div className="d-flex align-items-center">
                <div className="px-3">
                    <FontIcon 
                        icon="usd-circle" 
                        color="primary" 
                        size="lg"
                        className="hover-icon"/>
                </div>
                <div>
                    <p className="small mb-0 text-muted">
                        Price (SFM/USD)
                    </p>
                    <p className="mb-0">{props.value}</p>
                </div>
            </div>
            
        </Card.Body>
    </Card>
    </>)

}