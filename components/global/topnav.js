import { Container } from "react-bootstrap";

export default function TopNav({...props}) {

    return (
        <div className="py-2 default-gradient-dark top-nav text-end text-white">
            <Container>
                Want to support BscTracker?&nbsp;
                <a href="https://ko-fi.com/ogkingfox" 
                    target="_blank"
                    rel="nofollow noreferrer noopener"
                    className="text-white fw-bold">
                    Buy me a coffee!
                    <i className="fal fa-external-link ms-1"></i>
                </a>
            </Container>
        </div>
    )
}