import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Fighter from "../Fighter";
import TimeBar from "../UI/TimeBar";
import classes from "./Fight.module.css";

const Fight = props => {
  const { fighter1 } = props.fight;
  const { fighter2 } = props.fight;
  const fightLog = props.fight["fightLog"];
  const [fighter1Health, setFighter1Health] = useState(100);
  const [fighter2Health, setFighter2Health] = useState(100);
  const [timeLeft, setTimeLeft] = useState(100);
  const [currentLog, setCurrentLog] = useState(0);

  useEffect(() => {
      if(fighter1Health > 0 && fighter2Health > 0){
        const interval = setInterval(() => {
            const log = fightLog[currentLog];
            const splitLog = log.split(" ");
            const attackedFighter =
              splitLog[0] === fighter1.name ? fighter1 : fighter2;
            const dmg = splitLog[splitLog.length - 1];
            if (attackedFighter === fighter1) {
              setFighter1Health(oldHealth => calcHpWidth(fighter1Health, dmg));
              console.log("HEJ");
            }else{
              setFighter2Health(oldHealth => calcHpWidth(fighter2Health, dmg));
            }
      
            setCurrentLog(oldLog => oldLog + 1);
          }, 100);
          return () => clearInterval(interval);
      }
      else{
          props.handleShowFight()
      }

  }, [fighter1, fighter2, timeLeft]);

  const calcHpWidth = (health, dmg) => {
    return 100 - (dmg / health) * 100;
  };

  const nextMatchToShow = (
    <div className={classes.nextMatch}>
      <Fighter
        currentHealth={fighter1Health}
        name={fighter1.name}
        health={fighter1.health}
        wins={fighter1.wins}
        losses={fighter1.losses}
      ></Fighter>
      <div>
        <p>Fightlog</p>
      </div>

      <Fighter
        currentHealth={fighter2Health}
        name={fighter2.name}
        health={fighter2.health}
        wins={fighter2.wins}
        losses={fighter2.losses}
      ></Fighter>
    </div>
  );

  return <div>{nextMatchToShow}</div>;
};

Fight.propTypes = {};

export default Fight;
