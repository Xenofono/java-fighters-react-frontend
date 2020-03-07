import React, { useState, useEffect } from "react";
import Fighter from "../Fighter";
import Balloons from "../UI/Balloons";
import classes from "./Fight.module.css";

const Fight = props => {
  const { fighter1, fighter2 } = props.fight;
  const fightLog = props.fight["fightLog"];
  const [fighter1Health, setFighter1Health] = useState(100);
  const [fighter2Health, setFighter2Health] = useState(100);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [fightOver, setFightOver] = useState(false);
  const [showWinnerTimeLeft, setShowWinnerTimeLeft] = useState(100);

  useEffect(() => {
    if (currentLogIndex < fightLog.length) {
      const interval = setInterval(() => {
        const log = fightLog[currentLogIndex];
        const splitLog = log.split(" ");
        const attackedFighter =
          splitLog[0] === fighter1.name ? fighter1 : fighter2;
        const dmg = splitLog[splitLog.length - 1];
        if (attackedFighter === fighter1) {
          setFighter1Health(oldHealth =>
            calcHpWidth(attackedFighter, oldHealth, dmg)
          );
        } else {
          setFighter2Health(oldHealth =>
            calcHpWidth(attackedFighter, oldHealth, dmg)
          );
        }

        setCurrentLogIndex(oldLogIndex => {
          return oldLogIndex + 1;
        });
      }, 100);
      return () => clearInterval(interval);
    } else {
      if (fightOver === false) {
        setFightOver(true);
      }
      if (showWinnerTimeLeft > 0) {
        const interval = setInterval(() => {
          setShowWinnerTimeLeft(oldTime => oldTime - 1);
        }, 50);
        return () => clearInterval(interval);
      }
    }
    const loser = props.fight.winner.name === fighter1.name ? fighter2 : fighter1
    props.moveToNext(loser);
  }, [
    currentLogIndex,
    fighter1Health,
    fighter2Health,
    fightOver,
    showWinnerTimeLeft
  ]);

  const calcHpWidth = (fighter, health, dmg) => {
    const percentage = (dmg / fighter.health) * 100;
    return health - percentage;
  };

  const nextMatchToShow = fighter1 ? (
    <div className={classes.nextMatch}>
      <Fighter
        fighter={fighter1}
        currentHealth={fighter1Health}
        fight
      ></Fighter>
      <div>
        <p>
          {/* <strong>{currentLog}</strong> */}
        </p>
      </div>

      <Fighter
        fighter={fighter2}
        currentHealth={fighter2Health}
        fight
      ></Fighter>
    </div>
  ) : (
    <Balloons></Balloons>
  );

  const winner = props.fight.winner ? (
    <div className={classes.nextMatch}>
      <div>
        <h3 className={classes.winner}>Vinnaren!</h3>
        <Fighter
          fighter={props.fight.winner}
          fight
        ></Fighter>
      </div>
    </div>
  ) : null;

  return <div>{fightOver ? winner : nextMatchToShow}</div>;
};


export default Fight;
