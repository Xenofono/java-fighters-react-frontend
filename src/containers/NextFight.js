import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Fighter from "../Fighter";
import TimeBar from "../UI/TimeBar";
import Button from "../UI/Button";
import classes from "./NextFight.module.css";
import {Howl, Howler} from 'howler'


const NextFight = props => {
  const { fighter1, fighter2 } = props.nextMatch;
  const [timeLeft, setTimeLeft] = useState(100);


  useEffect(() => {
    if (timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft(oldTime => oldTime - 1);
      }, 50);
      return () => clearInterval(interval);
    } else {
      props.click();
    }
  }, [fighter1, fighter2, timeLeft]);

  const nextMatchToShow = fighter1 ? (
    <div className={classes.nextMatch}>
      <Fighter
        name={fighter1.name}
        health={fighter1.health}
        wins={fighter1.wins}
        losses={fighter1.losses}
      ></Fighter>
      <div className={classes.info}>
        <TimeBar time={timeLeft}></TimeBar>
        <h3>VS</h3>

        <Button size={15} click={props.click}>
          Starta matchen
        </Button>
      </div>

      <Fighter
        name={fighter2.name}
        health={fighter2.health}
        wins={fighter2.wins}
        losses={fighter2.losses}
      ></Fighter>
    </div>
  ) : null;

  return <div>{nextMatchToShow}</div>;
};

NextFight.propTypes = {};

export default NextFight;
