import React, { useState, useEffect } from "react";
import Fighter from "../Fighter";
import TimeBar from "../UI/TimeBar";
import Button from "../UI/Button";
import classes from "./NextFight.module.css";


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
        fighter={fighter1}
      ></Fighter>
      <div className={classes.info}>
        <TimeBar time={timeLeft}></TimeBar>
        <h3>VS</h3>

        <Button size={15} click={props.click}>
          Starta matchen
        </Button>
      </div>

      <Fighter
        fighter={fighter2}
      ></Fighter>
    </div>
  ) : null;

  return <div>{nextMatchToShow}</div>;
};


export default NextFight;
