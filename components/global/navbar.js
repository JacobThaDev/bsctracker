import React, { Component, Fragment } from 'react';
import { Container } from 'react-bootstrap';
import Footer from './footer';
import { NavbarLink } from './navbar_link';

export default class Navbar extends Component {

    componentDidMount() {
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
                    navbar.classList.add("nav-dark");
                } else {
                    navbar.classList.remove("nav-dark");
                }
            });
        } catch (err) {
            console.log(err);
        }
    }


    render() {
        return (
            <Fragment>
                <div className="custom-nav" id="customnav">
                    <div className="container-fluid px-4 px-lg-3">
                        <div className="d-flex custom-navbar flex-column text-start" id="navmenu">
                            
                            <a href="/" className="navbrand d-none d-lg-inline-block my-5 text-center" rel="nofollow">
                                <img src="/img/logo.svg" className="mb-3" width={50}/>
                                <h5 className="mb-0">BscTracker</h5>
                                <p className="small text-muted">SafeMoon v2</p>
                            </a>

                            <a href="/" className="navbrand d-lg-none my-5 text-center" 
                                rel="nofollow noopener" 
                                id="closebtn" 
                                style={{height:33}}>
                                <i className="fal fa-times"></i> Close
                            </a>

                            <div className="mb-5">
                                <p className="small text-uppercase w-100 ps-3 sidebar-header text-muted">
                                    Dashboard
                                </p>

                                <NavbarLink 
                                    name="Dashboard"
                                    to="/track" 
                                    icon="fa-window" />

                                <NavbarLink 
                                    name="Charts"
                                    to="/charts" 
                                    icon="fa-chart-line" />

                                <NavbarLink 
                                    name="Transactions"
                                    to="/txns" 
                                    icon="fa-shopping-cart" />

                                <NavbarLink 
                                    name="Updates"
                                    to="/updates" 
                                    icon="fa-sync" />
                            </div>


                            <Footer/>
                        </div>

                        <div className="d-flex d-lg-none justify-content-between align-items-center mobile-menu">
                            <a href="/" className="navbrand text-white">
                                <h5 className="mb-0">BscTracker</h5>
                                <p className="small text-muted mb-0">SafeMoon v2</p>
                            </a>
                            <div>
                                <a href="" className="btn btn-link btn-lg px-3 menu-btn" id="toggleMenu">
                                    <i className="fal fa-bars fa-fw"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}