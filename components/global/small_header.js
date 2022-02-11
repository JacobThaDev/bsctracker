import { Container } from "react-bootstrap";

export default function SmallHeader({ ...props }) {

    return (
        <div className="small-header">
            <Container>
                <h2 className="text-white fw-bold mb-0">
                    {props.title}
                </h2>
                <p className='text-white-50 mb-0'>{props.subtext}</p>
            </Container>
        </div>
    )
}