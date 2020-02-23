import React, { useEffect, useState } from "react";
import classes from "./Game.module.css";
import Fight from "./containers/Fight";
import NextFight from "./containers/NextFight";
import Fighter from "./Fighter";

const API_URL = "https://peaceful-dawn-33157.herokuapp.com/api/";

const Game = props => {
  const [fighters, setFighters] = useState([]);
  const [allFighters, setAllFighters] = useState();
  const [nextMatch, setNextMatch] = useState({});
  const [nextMatchLoaded, setNextMatchLoaded] = useState(false);
  const [fight, setFight] = useState({});
  const [showFight, setShowFight] = useState(false);

  useEffect(() => {
    if (fighters.length === 0) {
      fetch(API_URL + props.tournamentId)
        .then(response => response.json())
        .then(result => {
          setFighters(result["fightersRemaining"])
          setAllFighters(result["allFighters"].length)
        });
    }

    if (!showFight) {
      fetch(API_URL + props.tournamentId + "/upcoming")
        .then(response => response.json())
        .then(result => {
          setNextMatch(result);
          setNextMatchLoaded(true);
        });
    }
  });

  const handleShowFight = () => {
    setShowFight(!showFight);
  };

  const handleStartFight = () => {
    fetch(API_URL + props.tournamentId + "/fight")
      .then(response => response.json())
      .then(result => {
        setFight(result);
        handleShowFight();
      });
  };

  const handleLoser = loser => {
    setFighters(fighters.filter(f => f.name !== loser.name));
  };

const numberOfFighters = fighters.length !== 0 ? fighters.length : -1
  let currentBracket = "Första omgången";

  if(numberOfFighters > (allFighters/2)) currentBracket = "Kvartsfinal";
  else if(numberOfFighters > (allFighters/4)) currentBracket = "Semifinal";
  else if(numberOfFighters === 2){
    currentBracket = "Final";
  }

  const showMatchAndFight =
    !nextMatchLoaded && !showFight ? null : nextMatchLoaded && !showFight ? (
      <NextFight fighters={nextMatch} click={handleStartFight}></NextFight>
    ) : (
      <Fight
        fight={fight}
        handleShowFight={handleShowFight}
        sendLoser={handleLoser}
      ></Fight>
    );

  const showTournamentWinner =
    fighters.length !== 0 ? (
      <div>
        <h3>Mästaren av Java Fighters!</h3>
      <Fighter
        name={fighters[0].name}
        health={fighters[0].health}
        wins={fighters[0].wins}
        losses={fighters[0].losses}
      ></Fighter>
      </div>

    ) : null;


  return (
    <div>
      {fighters.length > 1 ? currentBracket : null}
      {fighters.length}
      <div className={classes.container}>
        {fighters.length > 1 ? showMatchAndFight : showTournamentWinner}
      </div>
    </div>
  );
};
export default Game;
