import React, { useEffect } from 'react';

import PageHead from '../head';
import Navbar from '../global/navbar';
import HeaderNav from '../header/userbar';

import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export default function Layout({ children, ...props }) {

    const router = useRouter();

    if (typeof window !== "undefined") {
        let stored = Cookies.get("wallet");
        
        if (!stored) {
            router.push("/");
            return null;
        }
    }

    return (
        <div>
            <PageHead title={props.title ? props.title : "Home"} />
            <Navbar />
    
            <div className="main-content">
                <HeaderNav title={props.title} />
    
                <div className="container-fluid px-4">
                    {children}
                </div>
            </div>
        </div>);


}