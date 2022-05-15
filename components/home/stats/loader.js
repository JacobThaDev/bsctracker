import { Card, Progress, Text } from "@nextui-org/react";

export default function StatsLoader({ data }) {
    
    if (data) {
        return null;
    }
    
    return (
        <Progress 
            css={{ br: 0}}
            size="xs" 
            indeterminated={data == null}
            color={"gradient"}
            value={0}  />
    )

}