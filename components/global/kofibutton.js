import {useState} from "react";
import { Button, Container, Grid, Link, Text, Modal } from "@nextui-org/react";
import SvgIcon from "../icons/svgicon";

export default function KofiButton() {

    const [visible, setVisible] = useState(false);
    const handler = () => setVisible(true);

    const closeHandler = () => {
        setVisible(false);
        console.log("closed");
    };

    return(
        <>
            <Button auto light color="primary" onClick={handler}>
                <Text css={{ pt: 8, pr: 5 }} color="white">
                    <SvgIcon 
                        icon="coffee" 
                        size={20} 
                        stroke={1}/>
                </Text>
                <Text color="white">
                    Buy me a coffee
                </Text>
            </Button>

            <Modal noPadding aria-labelledby="kofi-modal" open={visible} onClose={closeHandler}>
                <iframe 
                    id='kofiframe' 
                    style={{ border: 0, overflowY: "hidden" }}
                    src="https://ko-fi.com/ogkingfox/?hidefeed=true&widget=true&embed=true&preview=true" height='630' title='ogkingfox'></iframe>
            </Modal>
        </>
    )
}