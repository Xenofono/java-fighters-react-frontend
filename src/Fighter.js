import React from "react";
import PropTypes from "prop-types";
import classes from "./Fighter.module.css";
import TimeBar from "./UI/TimeBar";

const Fighter = props => {
  return (
    <div className={classes.fighter}>
      {typeof props.currentHealth !== "undefined" ? (
        <TimeBar time={props.currentHealth} color={"#FF2525"}></TimeBar>
      ) : null}
      <h4>
        Fighter: <strong>{props.name}</strong>
      </h4>
      <strong>
        <p>Hälsa: {props.health}</p>
        <p>Vinster: {props.wins}</p>
        <p>förluster: {props.losses}</p>
      </strong>
    </div>
  );
};

Fighter.propTypes = {};

export default React.memo(Fighter);
