import React from 'react'
import PropTypes from 'prop-types'
import classes from './Button.module.css'

const Button = props => {

    const style = {fontSize: props.size}
    return (
        <button className={classes.btn} style={style} onClick={props.click}>{props.children}</button>
    )
}

Button.propTypes = {

}

export default Button
