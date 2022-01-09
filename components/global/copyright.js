import { Col, Row } from "react-bootstrap";
import FontIcon from "./fonticon";

export default function Copyright({ ...props, }) {

    return (
        <Row className="text-center mt-5">
            <Col>
                <p>
                    Created by <a href="https://twitter.com/OG_KingFox" target="_blank" className="text-primary">
                        OGKingFox
                    </a>
                </p>

                <p>
                    <a href="https://discord.gg/5BejZeDxWx" 
                        target="_blank" rel="nofollow" className="text-primary">
                    <FontIcon type="brand" icon="discord" size="lg"/>
                    </a>
                    <a href="https://github.com/OGKingFox/sfmv2-tracker"
                        target="_blank" rel="nofollow" className="text-primary">
                    <FontIcon type="brand" icon="github" size="lg"/>
                    </a>
                    <a href="https://twitter.com/OG_KingFox" 
                        target="_blank" rel="nofollow" className="text-primary">
                    <FontIcon type="brand" icon="twitter" size="lg"/>
                    </a>
                </p>

                <p className="small text-muted">
                    Disclaimer: All prices are approximate, and may or may not be 100% accurate. 
                    <br/>This is not meant to be used to make financial decisions, nor am I a 
                    financial advisor.
                </p>
            </Col>
        </Row>
    );

}