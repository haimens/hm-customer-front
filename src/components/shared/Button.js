import React from 'react'
import './Button.css'
export default function Button(props) {
    const handleClick = () => {
        if (props.onClick) props.onClick()
    }
    return (
        <button
            type={props.type}
            className={`reusables-button ${props.className}`}
            style={props.style}
            onClick={() => handleClick()}
            disabled={props.disabled}
        >{props.label}</button>
    )
}
