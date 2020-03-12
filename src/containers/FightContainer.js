import React, { useState } from "react";
import classes from "./FightContainer.module.css";
import NextFight from "./NextFight";
import Fight from "./Fight";

const FightContainer = (props) => {
  const [showFight, setShowFight] = useState(false);

  const switchToFight = () => {
    props.handleShowBetting();
    setShowFight(true);
  };

  const toShow = showFight ? (
    <Fight fight={props.fight} moveToNext={props.handleShowFight}></Fight>
  ) : (
    <NextFight
      nextMatch={props.nextMatch}
      click={switchToFight}
      handleSelectFighter={props.handleSelectFighter}
      ></NextFight>
  );

  return <div className={classes.FightContainer}>{toShow}</div>;
};

export default FightContainer;
