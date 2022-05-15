import { Card, Text } from "@nextui-org/react";

export default function LoadingCard() {

    return(
        <Card>
            <Card.Body>
                <div className="text-loading sm"/>
                <div className="text-loading lg"/>
            </Card.Body>
            <Card.Footer>
                <div className="text-loading md"/>
            </Card.Footer>
        </Card>
    )
}