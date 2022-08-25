import {Text, Link, Button, Grid, Input, Modal} from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Functions from "../../helpers/Functions";
import SvgIcon from "./SvgIcon";
import toast from 'react-hot-toast';

export default function Navbar() {

    const [visible, setVisible] = useState(false);

    const handler = (e) => {
        e.preventDefault();
        setVisible(true);
    };

    const closeHandler = () => {
        setVisible(false);
    };

    const [ open, setOpen ] = useState(false);
    const router = useRouter();

    const submit = (e) => {
        e.preventDefault();

        let data    = new FormData(e.target);
        let address = data.get("address");

        if (!Functions.validateAddress(address)) {
            toast.error("Invalid wallet address");
        } else {
            router.push("/track/"+address);
        }
    }

    return (
        <>
            <div className="custom-nav" id="customnav">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className={`d-flex align-items-center custom-navbar flex-column flex-lg-row ${open && "open"}`}>
                                <Button
                                    className="d-lg-none"
                                    auto
                                    light
                                    css={{ p: 5 }}
                                    onClick={() => setOpen(false)}>
                                    <Text size={14} color="error">
                                        <SvgIcon icon="x-circle" size={30}/>
                                    </Text>
                                </Button>

                                <Link href="/" className="navbrand">
                                    <Text size={20}>
                                        <span className="highlight">Bsc</span>Tracker
                                    </Text>
                                </Link>

                                <div className="form-container">
                                    <form onSubmit={submit} style={{ width: "100%" }}>
                                        <Input
                                            bordered
                                            aria-label="Enter a wallet address"
                                            rounded
                                            name="address"
                                            css={{ width: "100%" }}
                                            className="address-input"
                                            contentRightStyling={false}
                                            contentRight={
                                                <Button size="sm" css={{ mr: 4 }}
                                                    type="submit"
                                                    auto rounded>
                                                    <SvgIcon icon="search" size={16} stroke={2}/><span className="d-none d-lg-inline-block">&nbsp;Lookup</span>
                                                </Button>
                                            }
                                            placeholder="Address"/>
                                    </form>
                                </div>

                                <div className="d-flex flex-column flex-lg-row navlinks">
                                    <div className="flex-fill">
                                        <Link href="/" className="custom-link" onClick={(e) => handler(e)}>
                                            Buy me a Coffee
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex d-lg-none justify-content-between align-items-center mobile-menu">
                                <Link href="" className="navbrand">
                                    <Text size={20}>
                                        <span>Bsc</span>Tracker
                                    </Text>
                                </Link>
                                <div>
                                    <Button
                                        auto
                                        light
                                        css={{ p: 5 }}
                                        onClick={() => setOpen(!open)}>
                                        <SvgIcon icon="menu" size={30} stroke={2}/>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal noPadding aria-labelledby="kofi-modal" open={visible} onClose={closeHandler}>
                <iframe
                    id='kofiframe'
                    style={{ border: 0, overflowY: "hidden" }}
                    src="https://ko-fi.com/ogkingfox/?hidefeed=true&widget=true&embed=true&preview=true" height='630' title='ogkingfox'></iframe>
            </Modal>
        </>
    )
}
