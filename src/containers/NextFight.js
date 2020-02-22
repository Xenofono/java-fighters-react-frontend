import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Fighter from "../Fighter";
import TimeBar from "../UI/TimeBar";
import classes from "./NextFight.module.css";

const NextFight = props => {
  const { fighter1 } = props.fighters;
  const { fighter2 } = props.fighters;
  const [timeLeft, setTimeLeft] = useState(100);

  useEffect(() => {
    if (timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft(oldTime => oldTime - 1);
      }, 300);
      return () => clearInterval(interval);
    }
  }, [fighter1, fighter2, timeLeft]);

  const nextMatchToShow = (
    <div className={classes.nextMatch}>
      <Fighter
        name={fighter1.name}
        health={fighter1.health}
        wins={fighter1.wins}
        losses={fighter1.losses}
      ></Fighter>
      <div>
        <TimeBar time={timeLeft}></TimeBar>
        <h3>VS</h3>
        
          <button className={classes.matchBtn}>Starta matchen</button>
        
      </div>

      <Fighter
        name={fighter2.name}
        health={fighter2.health}
        wins={fighter2.wins}
        losses={fighter2.losses}
      ></Fighter>
    </div>
  );

  return <div>{nextMatchToShow}</div>;
};

NextFight.propTypes = {};

export default NextFight;
