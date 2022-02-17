import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import FontIcon from "./fonticon";

export default function Navigation() {

    const [themeIcon, setThemeIcon] = useState(null);

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

                if (pos > 0) {
                    if (!navbar.classList.contains("position-fixed")) {
                        navbar.classList.add("position-fixed");
                    }
                }

                if (pos > 50) {
                    navbar.classList.add("nav-scroll")
                } else {
                    navbar.classList.remove("nav-scroll")
                }
            });

            let theme = Cookies.get("theme");
            console.log(theme);
            if (theme) {
                setThemeIcon(<FontIcon icon={theme == "dark" ? "sun-alt" : "moon"} type="fas" />);
            } else {
                setThemeIcon(<FontIcon icon="fa-moon" type="fas"/>);
            }
        } catch (err) {
            console.log(err);
        }
    }, []);

    let themeIco = themeIcon;



    return(
        <div className="custom-nav text-center position-fixed" id="customnav">
            <Container>
                <div className="d-flex align-items-center custom-navbar flex-column flex-lg-row" id="navmenu">
                    
                    <a href="/" className="d-lg-none mb-0" rel="nofollow noopener" id="closebtn">
                        <FontIcon icon="times" type="fal" />
                        Close
                    </a>

                    <a href="/" className="navbrand mb-5 mb-lg-0 me-0 me-lg-3" rel="nofollow">
                        <FontIcon icon="chart-bar" type="fal" size="lg" className="me-3" />
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
                        <div className="flex-fill">
                            <a href="/updates" className="custom-link px-3">
                                Update Log
                            </a>
                        </div>
                    </div>

                    <div className="d-flex flex-column flex-lg-row text-center ms-auto d-none d-lg-flex">
                        <div className="flex-fill">
                            <a href="/donate" target="_blank" className="custom-link px-3">
                                <FontIcon icon="coffee" type="fal" className="me-2" />
                                Buy Me a Coffee
                            </a>
                        </div>
                    </div>

                    <div className="d-flex flex-column flex-lg-row align-items-lg-center text-center ms-auto ms-lg-0 d-none d-lg-flex">
                        <div className="flex-fill">
                            <a href="/" className="custom-link" id="themeToggle">
                                {themeIco}
                            </a>
                        </div>
                    </div>
                </div>

                <div className="d-flex d-lg-none justify-content-between align-items-center mobile-menu">
                    <a href="/" className="navbrand">
                        <i className="fal fa-chart-bar me-3" />
                    </a>
                    <div>
                        <a href="/donate" target="_blank" className="btn btn-link menu-btn">
                            <FontIcon icon="coffee" type="fal" />
                            Buy me a Coffee
                        </a>

                        <a href="" className="btn btn-link menu-btn" id="themeToggle">
                            {themeIco}
                        </a>
                        <a href="" className="btn btn-link menu-btn" id="toggleMenu">
                            <FontIcon icon="bars" type="fas" />
                        </a>
                    </div>
                </div>
            </Container>
        </div>
    )
}