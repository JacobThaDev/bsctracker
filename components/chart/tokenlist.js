import { Card, Container } from "react-bootstrap";

export default function TokenList({...props}) {

    let list = [];

    for (let token of props.tokens) {
        let symbol = token.symbol.toLowerCase();
        let active = props.active && props.active.symbol.toLowerCase() == symbol;

        list.push(
            <a href={"/chart/"+token.symbol.toLowerCase()} 
                key={token.symbol}
                className={"btn text-uppercase mx-1 "+(active ? "btn-dark" : "search-btn")}>
                {token.symbol}
            </a>
        )
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