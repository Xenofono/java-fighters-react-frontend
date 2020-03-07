import React from "react";
import PropTypes from "prop-types";
import classes from "./Fighter.module.css";
import TimeBar from "./UI/TimeBar";
/*
prop fight determines if odds are shown or not
*/
const Fighter = props => {
  return (
    <div className={classes.fighter}>
      {typeof props.currentHealth !== "undefined" ? (
        <TimeBar time={props.currentHealth} color={"#FF2525"}></TimeBar>
      ) : null}
      <h4>
        Fighter: <strong>{props.fighter.name}</strong>
      </h4>
      <strong>
        <p>Hälsa: {props.fighter.health}</p>
        <p>Vinster: {props.fighter.wins}</p>
        <p>förluster: {props.fighter.losses}</p>
        {!props.fight ? <p>Odds: {props.fighter.odds}</p> : null}
      </strong>
    </div>
  );
};

Fighter.propTypes = {};

export default React.memo(Fighter);
