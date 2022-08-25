import Footer from "../../../components/global/Footer";
import Navbar from "../../../components/global/Navbar";
import GridCol from "../../../components/grid/Column";
import GridContainer from "../../../components/grid/Container";
import GridRow from "../../../components/grid/Row";
import Layout from "../../../components/Layout";
import Overview from "../../../components/tracker/overview";
import {useEffect, useState} from "react";
import {useTracker} from "../../../context/tracker";
import Wallet from "../../../helpers/Wallet";
import TokenList from "../../../components/tracker/TokenList";
import {Text} from "@nextui-org/react";
import Leaderboard from "../../../components/tracker/Leaderboard";
import {useRouter} from "next/router";

export default function Portfolio({ address }) {

    const router = useRouter();

    const [ totalValue, setTotalValue ] = useState(0);
    const [ loading, setLoading ]       = useState(true);
    const { tokens }                    = useTracker();
    const [ active, setActive ]         = useState(null);
    const [ updated, setUpdated ]       = useState(null);

    const changeToken = (key) => {
        let token;

        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i].contract.toLowerCase() === key.currentKey.toLowerCase()) {
                token = tokens[i];
                break;
            }
        }

        if (token) {
            router.push("/track/"+address+"/"+token.symbol.toLowerCase());
            setActive(token);
        }
        //setActive(token);
    }

    useEffect(() => {
        setUpdated(Date.now());
    }, []);

    return(
        <Layout>
            <Navbar/>

            <div className="content">
                <GridContainer>
                    <GridRow>
                        <GridCol def={12} lg={8}>
                            <Overview address={address}
                                      lastUpdate={updated}
                                      value={totalValue}/>
                            <TokenList tokens={tokens}
                                       address={address}
                                       setTotalValue={setTotalValue}
                                       changeToken={changeToken}/>
                        </GridCol>
                        {
                            <GridCol def={12} lg={4}>
                                <Leaderboard
                                    tokens={tokens}
                                    title={"Top 5 Gainers"}
                                    sorting={"desc"}/>
                                {<Leaderboard
                                    tokens={tokens}
                                    title={"Top 5 Losers"}
                                    sorting={"asc"}/>}
                            </GridCol>
                        }
                    </GridRow>

                    <Text size={12} color={"$gray600"} css={{ mt: 50 }}>
                        All values here are estimates.<br/>
                        This page is not intended to help you make financial decisions.
                    </Text>
                </GridContainer>
            </div>
            
            <Footer/>
        </Layout>
    )
}

export async function getServerSideProps( request ) {
    const { address } = request.params;

    return {
        props: {
            address: address
        }, // will be passed to the page component as props
    }
}