import { useEffect } from "react";
import { Container, Form, FormControl } from "react-bootstrap";
import FontIcon from "../components/global/fonticon";
import SmallHeader from "../components/global/small_header";
import Layout from "../components/layout";
import { renderToString } from 'react-dom/server';

export default function Donate({...props}) {

    const wallet = "0x5E457D37fe3C3F522C04f7B3eB0b4cf3E6b992CE";
    let locked   = false;

    useEffect(async() => {
        if (document) {
            let copy     = document.getElementById("copy");
            let wallet   = document.getElementById("wallet");
            let original = copy.innerHTML;
            let success  = <FontIcon type="fal" icon="check"/>;
            let error    = <FontIcon type="fal" icon="times"/>;

            copy.addEventListener("click", async function(event) {
                if (locked) {
                    copy.blur();
                    return;
                }

                locked = true;

                try {
                    await navigator.clipboard.writeText(wallet.innerHTML);
                    copy.innerHTML = renderToString(success) + " Copied!";
                    copy.blur();
                    copy.classList.remove("btn-primary");
                    copy.classList.add("btn-success");
                    setTimeout(() => {
                        copy.innerHTML = original;
                        copy.classList.add("btn-primary");
                        copy.classList.remove("btn-success");
                        locked = false;
                    }, 1000);
                } catch(err) {
                    console.log(err);
                    copy.innerHTML = renderToString(error) + " Error!";
                    copy.classList.add("btn-danger");
                    copy.classList.remove("btn-success");
                    copy.classList.remove("btn-primary");
                    setTimeout(() => {
                        copy.innerHTML = original;
                        copy.classList.add("btn-primary");
                        copy.classList.remove("btn-danger");
                        locked = false;
                    }, 1000);
                }
            });
        }
    }, []);

    return(
        <Layout title="Home">
            <SmallHeader 
                title="Buy me a Coffee" 
                subtext="Like BscTracker and want to help make it better?"/>

            <section className="py-5">
                <Container>
                    <h4 className="text-primary fw-bold">
                        About Donating
                    </h4>
                    <p>
                        Donations will help keep me fueled for development with tons of coffee, 
                        and keep the servers online and operating. With growing data comes
                        growing server costs, which can get quite expensive. Any little bit helps!
                    </p>

                    <a href="https://ko-fi.com/ogkingfox" 
                        target="_blank"
                        className="btn btn-primary rounded-pill px-3 mb-3">
                        Donate via Ko-Fi (Paypal/Card)

                        <FontIcon type="fal" icon="external-link" 
                            className="ms-3"/>
                    </a>

                    <p>- or -</p>

                    <p className="mb-0">Bsc Donations:</p>

                    <div>
                        <span id="wallet">{wallet}</span>
                        <button id="copy" className="rounded-pill btn btn-primary px-3 ms-3">
                            <FontIcon type="fal" icon="copy"/> Copy
                        </button>
                    </div>
                </Container>
            </section>
            
        </Layout>
    )
}