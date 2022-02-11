import { Card, Container } from "react-bootstrap";

export default function TrackerTokens({...props}) {

    let list = [];

    for (let i = 0; i < props.tokens.length; i++) {
        let token = props.tokens[i].symbol.toLowerCase();

        list.push(
        <a href={"/"+token+"/"+props.address} 
            className="btn btn-primary border-0 text-uppercase mx-1"
            id="tokenBtn"
            data-token={token}
            key={i}>
            {token}
        </a>)
    }
    
    return (<>{list}</>)
}