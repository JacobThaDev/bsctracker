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

                if (pos > 50) {
                    navbar.classList.add("shadow")
                    navbar.classList.add("nav-scroll")
                } else {
                    navbar.classList.remove("shadow")
                    navbar.classList.remove("nav-scroll")
                }
            });
        } catch (err) {
            console.log(err);
        }
    }, []);

    return(
        <div className="custom-nav text-center sticky-top" id="customnav">
            <Container>
                <div className="d-flex align-items-center custom-navbar flex-column flex-lg-row" id="navmenu">
                    
                    <a href="/" className="d-lg-none mb-0" rel="nofollow noopener" id="closebtn">
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
                            <a href="/chart" className="custom-link px-3">
                                Charts
                            </a>
                        </div>
                        <div className="flex-fill">
                            <a href="/team" className="custom-link px-3">
                                Our Team
                            </a>
                        </div>
                    </div>

                    <div className="d-flex flex-column flex-lg-row text-center ms-auto d-none d-lg-flex">
                        <div className="flex-fill">
                            <a href="https://ko-fi.com/ogkingfox" target="_blank" className="custom-link px-3">
                                <i className="fal fa-coffee me-2" />
                                Buy Me a Coffee
                            </a>
                        </div>
                    </div>

                    <div className="d-flex flex-column flex-lg-row align-items-lg-center text-center ms-auto ms-lg-0 d-none d-lg-flex">
                        
                        <div className="flex-fill">
                            <a href="/" className="custom-link " id="themeToggle">
                                <i className="fas fa-moon fa-fw"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="d-flex d-lg-none justify-content-between align-items-center mobile-menu">
                    <a href="/" className="navbrand">
                        <i className="fal fa-chart-bar me-3" />
                    </a>
                    <div>
                        <a href="https://ko-fi.com/ogkingfox" target="_blank" className="btn btn-link menu-btn">
                            <i className="fal fa-coffee me-2"></i>
                            Buy me a Coffee
                        </a>

                        <a href="" className="btn btn-link menu-btn" id="themeToggle">
                            <i className="fas fa-moon fa-fw"></i>
                        </a>
                        <a href="" className="btn btn-link menu-btn" id="toggleMenu">
                            <i className="fas fa-bars fa-fw"></i>
                        </a>
                    </div>
                </div>
            </Container>
        </div>
    )
}