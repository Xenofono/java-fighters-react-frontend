import React from 'react'
import classes from './Button.module.css'

const Button = props => {

    const style = {fontSize: props.size, marginTop: props.top}
    return (
        <button className={classes.btn} style={style} onClick={props.click}>{props.children}</button>
    )
}

export default Button
