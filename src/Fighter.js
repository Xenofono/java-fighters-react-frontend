import React from "react";
import PropTypes from "prop-types";
import classes from "./Fighter.module.css";

const Fighter = props => {
  return (
    <div className={classes.fighter}>
      <h4>Fighter: {props.name}</h4>
      <p>Hälsopoäng(svenska..): {props.health}</p>
      <p>
        Vinster: {props.wins} förluster: {props.losses}
      </p>
    </div>
  );
};

Fighter.propTypes = {};

export default React.memo(Fighter);
