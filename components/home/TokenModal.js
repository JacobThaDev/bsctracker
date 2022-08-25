import { 
    Text, Button, Modal 
} from "@nextui-org/react";

import { useState } from "react";
import SvgIcon from "../global/SvgIcon";
import TokenList from "./TokenList";

export default function TokenModal() {

    const [visible, setVisible] = useState(false);
    const handler = () => setVisible(true);

    const closeHandler = () => {
        setVisible(false);
    };

    return(
        <>
            <Button auto onClick={handler} rounded color={"success"}
                icon={<SvgIcon icon="list" size={16} stroke={3}/>}>
                Tokens
            </Button>

            <Modal closeButton blur aria-labelledby="modal-title" open={visible} onClose={closeHandler} width={500}>
                <Modal.Header>
                    <div>
                        <Text size={18}>Token List</Text>
                        <Text size={12}>
                            Select a token below to view detailed stats
                        </Text>
                    </div>
                </Modal.Header>
                <Modal.Body css={{ px: 0 }}>
                    <TokenList closeHandler={closeHandler} />
                </Modal.Body>
                <Modal.Footer>
                    <Text size={12} color={"$gray800"}>
                        Want your token added? <a href={"/request"} target={"_blank"}>Request it to be added!</a>
                    </Text>
                </Modal.Footer>
            </Modal>
        </>
    )
}