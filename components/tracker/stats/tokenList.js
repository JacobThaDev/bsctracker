import { Card, Container } from "react-bootstrap";

export default function TrackerTokens({...props}) {

    const tokens = require("../../../tokens");

    let list     = [];
    let keysList = Object.keys(tokens);
    
    for (let i = 0; i < keysList.length; i++) {
        let token = tokens[keysList[i]];

        list.push(
        <a href={"/"+token.abbr+"/"+props.address} 
            className="btn btn-light text-uppercase mx-1"
            id="tokenBtn"
            data-token={token.abbr}
            key={i}>
            {token.abbr}
        </a>)
    }
    
    return (
        <section style={{marginTop: -25}}>
            <Container>
                <Card className="border-0 shadow-sm">
                    <Card.Body>
                        {list}
                    </Card.Body>
                </Card>
            </Container>
        </section>
    )
}