import React, { useState } from "react";
import classes from "./FightContainer.module.css";
import NextFight from "./NextFight";
import Fight from "./Fight";

const FightContainer = props => {

  const [showFight, setShowFight] = useState(false);

  const switchToFight = () => {
    setShowFight(true);
  };

  const toShow = showFight ? (
    <Fight fight={props.fight} moveToNext={props.handleShowFight}></Fight>
  ) : (
    <NextFight nextMatch={props.nextMatch} click={switchToFight}></NextFight>
  );

  return <div className={classes.FightContainer}>{toShow}</div>;
};


export default FightContainer;
