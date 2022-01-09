import { useRouter } from 'next/router'
import React from 'react'

export const NavbarLink = ({ ...props }) => {
    
    const { asPath } = useRouter()
    const isActive   = asPath === props.to;
    const className  = isActive ? "text-info" : "";
    
    return (
        <a href={props.to} className={"custom-link mb-2 "+className}>
            <i className={"fal "+props.icon+" fa-fw fa-2x"}></i> 
        </a>);
}