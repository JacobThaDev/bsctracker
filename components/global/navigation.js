import Cookies from "js-cookie";
import { useEffect } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";

export default function Navigation() {

    useEffect(() => {
        try {
            let toggle   = document.getElementById("toggleMenu");
            let menu     = document.getElementById("navmenu");
            let closeBtn = document.getElementById("closebtn");
            let navbar   = document.getElementById("customnav");
            
            toggle.addEventListener("click", function(event) {
                event.preventDefault();
                menu.classList.toggle("open");
            });

            closeBtn.addEventListener("click", function(event) {
                event.preventDefault();
                menu.classList.remove("open");
            });

            document.addEventListener('scroll', function(e) {
                let pos = window.scrollY;

                if (pos > 45) {
                    navbar.style.backgroundColor = "#000000AA";
                } else {
                    navbar.style.backgroundColor = "transparent";
                }
            });
        } catch (err) {
            console.log(err);
        }
    }, []);

    return(
        <div className="custom-nav text-center" id="customnav">
                <Container>
                    <div className="d-flex align-items-center custom-navbar flex-column flex-lg-row" id="navmenu">
                        
                        <a href="/" className="d-lg-none text-white mb-0" rel="nofollow noopener" id="closebtn">
                            <i className="fal fa-times"></i> Close
                        </a>

                        <a href="/" className="navbrand mb-5 mb-lg-0 me-0 me-lg-3" rel="nofollow">
                            <i className="fal fa-chart-bar me-3" />
                            BscTracker
                        </a>

                        <div className="d-flex flex-column flex-lg-row text-center">
                            <div className="flex-fill">
                                <a href="/" className="custom-link px-3">
                                    Home
                                </a>
                            </div>
                            <div className="flex-fill">
                                <a href="/team" className="custom-link px-3">
                                    Our Team
                                </a>
                            </div>
                        </div>

                        <div className="d-flex flex-column flex-lg-row align-items-lg-center text-center ms-auto d-none d-lg-flex">
                            <a href="https://ko-fi.com/ogkingfox"
                                target="_blank"
                                rel="nofollow noopener noreferrer"
                                className="btn btn-outline-light pulse-primary px-3 me-3">
                                Buy me a Coffee
                            </a>
                            <div className="flex-fill">
                                <a href="/" className="custom-link" id="themeToggle">
                                    <i className="fas fa-moon fa-fw"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex d-lg-none justify-content-between align-items-center mobile-menu">
                        <a href="/" className="navbrand text-white">
                            <i className="fal fa-chart-bar me-3" />
                            BscTracker
                        </a>
                        <div>
                            <a href="" className="btn btn-link text-white btn-lg px-3 menu-btn" id="themeToggle">
                                <i className="fas fa-moon fa-fw"></i>
                            </a>
                            <a href="" className="btn btn-outline-light pulse-primary me-3">
                                Buy me a Coffee
                            </a>
                            <a href="" className="btn btn-outline-light px-3 menu-btn" id="toggleMenu">
                                <i className="fal fa-bars fa-fw"></i>
                            </a>
                        </div>
                    </div>
                </Container>
            </div>
    )
}