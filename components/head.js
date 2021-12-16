import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Cookies from 'js-cookie';

export default function PageHead({ ... props }) {

    let title = typeof props.title == "undefined" ? "Home" : props.title;
    let desc  = typeof props.desc == "undefined" ? "A reflection and value tracker for your SafeMoon v2 wallet." : props.desc;
    let style = "/css/themes/light.css";

    if (typeof window !== "undefined" && localStorage.getItem("dark-mode")) {
        style = "/css/themes/dark.css";
    }

    return (
        <Head>
            <title>{title} | SFM v2 Tracker</title>
            <meta name="viewport" content="width=device-width, initial-scale=0.87, shrink-to-fit=no" />
            <meta name="description" content={desc} />
            <meta name="keywords" content="sfm,safemoon,safemoon v2,wallet tracker"/>
            <link rel="stylesheet" href={style} />
        </Head>
    );
    
}