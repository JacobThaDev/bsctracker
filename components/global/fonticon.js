import { createPortal } from "react-dom";

export default function FontIcon({ className, ...props}) {

    let icon = props.icon ? "fa-"+props.icon : null;

    if (!icon) {
        return null;
    }

    let types = {
        light: 'fal', 
        regular: 'far', 
        solid: 'fas', 
        duo: 'fad', 
        brand: 'fab'
    }

    let colors = {
        primary: 'text-primary',
        success: 'text-success',
        info: 'text-info',
        warning: 'text-warning',
        danger: 'text-danger',
        default: 'text-default',
    }

    let sizes  = ['lg', '2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x', '10x'];

    if (props.type && !Object.keys(types).includes(props.type))
        throw new Error("Invalid icon type. \nValid: "+Object.keys(types));
    if (props.color && !Object.keys(colors).includes(props.color)) 
        throw new Error("Invalid icon color. \nValid: "+Object.keys(colors));
    if (props.size && !sizes.includes(props.size)) 
        throw new Error("Invalid icon size. \nValid: "+sizes);
    

    let color = props.color ? colors[props.color] : colors['default'];
    let type  = props.type ? types[props.type] : types['light'];
    let size  = props.size ? "fa-"+props.size : '';

    return (
        <i className={type+" fa-"+props.icon+" "+size+" fa-fw "+color+" "+className}></i>
    )
}