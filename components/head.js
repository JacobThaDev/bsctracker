import Head from 'next/head';

export default function PageHead({...props}) {

    return (
        <Head key="ph">
            <title>{props.title && props.title} | BscTracker</title>
            <meta name="description" content={props.desc && props.desc} />
            <link rel="icon" href="/favicon.ico" />

            <link type="javascript" src="https://unpkg.com/lightweight-charts/dist/lightweight-charts.standalone.production.js"/>
        </Head>
    );

}