import React, { useEffect, useState } from "react";
import classes from "./Game.module.css";
import Fight from "./containers/Fight";
import NextFight from "./containers/NextFight";

const API_URL = "https://peaceful-dawn-33157.herokuapp.com/api/";

const Game = props => {
  const [fighters, setFighters] = useState([]);
  const [nextMatch, setNextMatch] = useState({});
  const [nextMatchLoaded, setNextMatchLoaded] = useState(false);
  const [fight, setFight] = useState({});
  const [showFight, setShowFight] = useState(false);

  useEffect(() => {
    fetch(API_URL + props.tournamentId)
      .then(response => response.json())
      .then(result => setFighters(result["fightersRemaining"]));

      if(!showFight){
        fetch(API_URL + props.tournamentId + "/upcoming")
        .then(response => response.json())
        .then(result => {
          setNextMatch(result);
          setNextMatchLoaded(true);
        });
      }

  });

  const loadUpcomingMatch = () => {};

  const handleShowFight = () => {
    setShowFight(!showFight);
  };

  const handleStartFight = () => {
    fetch(API_URL + props.tournamentId + "/fight")
      .then(response => response.json())
      .then(result => {
        setFight(result);
        handleShowFight()
      });
  };

  const test = !nextMatchLoaded && !showFight ?
  null : 
  nextMatchLoaded && !showFight ? (
    <NextFight fighters={nextMatch} click={handleStartFight}></NextFight>
) : (
    <Fight fight={fight} showFightHandler={handleShowFight}></Fight>
);

  // const toShow = nextMatchLoaded ? (
  //     <NextFight fighters={nextMatch} click={handleStartFight}></NextFight>
  // ) : (
  //     <Fight fighters={fight} showfightHandler={handleShowFight}></Fight>
  // );

  return (
    <div>
      {fighters.length}
      <div className={classes.container}>{test}</div>
    </div>
  );
};
export default Game;
