import { Container } from "react-bootstrap";

export default function ChartHeader({ ...props }) {

    return (
        <div className="bg-dark pt-5">
            <Container className="py-5">
                <h2 className="text-white fw-bold mb-0">
                    {props.token.title} Chart
                </h2>
            </Container>
        </div>
    )
}