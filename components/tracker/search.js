import { useEffect, useState, useMemo } from "react";
import { Button, Card, Grid, Image, Input, useInput } from '@nextui-org/react'

const tokens  = require("../../tokens");
const symbols = Object.keys(tokens);

export default function SearchBar({ defaultValue, activeToken }) {

    const [active, setActive] = useState(activeToken ? activeToken : "sfm");

    useEffect(async() => {

    }, []);

    const { value, reset, bindings } = useInput("");

    const validateAddress = (value) => {
        return value.match(/^(0x)([A-Fa-f0-9]{40})$/);
    };

    const submitForm = (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        let address  = formData.get("address");

        if (!validateAddress(address)) {
            return;
        }

        window.location = `/track/${active}/${address}`
    }

    const helper = useMemo(() => {
        if (!value) {
            return {
                text: "",
                color: "",
            };
        }

        const isValid = validateAddress(value);

        return {
            text: isValid ? "" : "Enter a valid wallet address",
            color: isValid ? "success" : "error",
        };
    }, [value]);

    return (
        <Card css={{ overflow: 'visible' }}>
            <Card.Body css={{ overflowY: 'visible', pt: 20 }}>
                <form method="get" onSubmit={submitForm} className="address-form">
                    <Input
                        name="address"
                        clearable
                        bordered
                        size="lg"
                        initialValue={defaultValue}
                        shadow={false}
                        aria-label="wallet address"
                        onClearClick={reset}
                        status={helper.color}
                        color={helper.color}
                        animated={false}
                        type="text"
                        contentLeftStyling={false}
                        contentRightStyling={false}
                        contentRight={
                            <Button auto light type="submit" color={helper.color}>
                                <strong>Continue</strong>
                            </Button>
                        }
                        contentLeft={
                        <div className="custom-dropdown">
                            <Image src={`/img/tokens/${active}.png`} width={20} height={20}/>
                            <div className="dropdown-menu">
                            {symbols.map((symbol, index) => {
                                let token = tokens[symbol];

                                return(
                                    <a href="#" className="dropdown-item" key={index} onClick={() => setActive(symbol)}>
                                        <Grid.Container alignItems="center">
                                            <Grid css={{ mt: 5, mx: 10 }}>
                                                <Image src={`/img/tokens/${symbol}.png`}
                                                    width={20} 
                                                    height={20} 
                                                    containerCss={{ d: "inline-block" }} /> 
                                            </Grid>
                                            <Grid>{token.title}</Grid>
                                        </Grid.Container>
                                    </a>
                                )
                            })}
                            </div>
                        </div>
                        }/>
                </form>
            </Card.Body>
        </Card>
    )
}