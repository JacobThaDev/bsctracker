import { Card, Container } from "react-bootstrap";

export default function TokenList() {

    const tokens = require("../../tokens");

    let list     = [];
    let keysList = Object.keys(tokens);
    
    for (let i = 0; i < keysList.length; i++) {
        let token = tokens[keysList[i]];

        list.push(
        <a href={"/chart/"+token.abbr} 
            className="btn btn-white text-uppercase mx-1"
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