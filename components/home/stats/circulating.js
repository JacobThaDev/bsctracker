import { Card } from "react-bootstrap";
import FontIcon from "../../global/fonticon";

export default function CirculatingCard({ ... props}) {

    return(<>
    <Card className="shadow mb-3">
        <Card.Body>
            <div className="d-flex align-items-center">
                <div className="px-3">
                    <FontIcon 
                        icon="sync"
                        color="primary" 
                        size="lg"
                        className="hover-icon"/>
                </div>
                <div>
                    <p className="small mb-0 text-muted">
                        Circulating
                    </p>
                    <p className="mb-0">{props.value}</p>
                </div>
            </div>
        </Card.Body>
    </Card>
    </>)

}