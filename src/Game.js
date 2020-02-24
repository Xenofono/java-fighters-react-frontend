import React, { useEffect, useState } from "react";
import classes from "./Game.module.css";
import FightContainer from "./containers/FightContainer";
import Fighter from "./Fighter";
import Balloons from './UI/Balloons'

const API_URL = "http://localhost:8080/api/";

const Game = props => {
  const [fighters, setFighters] = useState([]);
  const [allFighters, setAllFighters] = useState();
  const [nextMatch, setNextMatch] = useState({});
  const [fight, setFight] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [tournamentOver, setTournamentOver] = useState(false);

  useEffect(() => {
    if (fighters.length === 0) {
      fetch(API_URL + props.tournamentId)
        .then(response => response.json())
        .then(result => {
          setFighters(result["fightersRemaining"]);
          setAllFighters(result["allFighters"].length);
        });
    }

    if (!loaded && !tournamentOver) {
      fetch(API_URL + props.tournamentId + "/upcoming")
        .then(nextMatchResponse => nextMatchResponse.json())
        .then(nextMatchResult => {
          fetch(API_URL + props.tournamentId + "/fight")
            .then(response => response.json())
            .then(result => {
              setNextMatch(nextMatchResult);
              setFight(result);
            })
            .then(() => setLoaded(true));
        });
    }
  }, [loaded]);

  const handleShowFight = loser => {
    setFighters(oldFighters => {
      if (oldFighters.length === 2) {
        setTournamentOver(true);
      } else {
        setLoaded(false);
      }
      return fighters.filter(f => f.name !== loser.name);
    });
  };

  const numberOfFighters = fighters.length !== 0 ? fighters.length : -1;
  let currentBracket = "Kvartsfinal";

  if (numberOfFighters < allFighters / 2 + 1) currentBracket = "Semifinal";
  else if (numberOfFighters === 2) {
    currentBracket = "Final";
  } else if (numberOfFighters === 1) currentBracket = "Vinnaren!";

  console.log("FIGHTERS KVAR!", fighters);
  const tournamentWinner = loaded ? (
    <div className={classes.nextMatch}>
      <div>
        <h3>Mästaren av Java Fighters!</h3>
        <Fighter
          name={fighters[0].name}
          health={fighters[0].health}
          wins={fighters[0].wins}
          losses={fighters[0].losses}
        ></Fighter>
      </div>
    </div>
  ) : null;

  const test = loaded ? (
    <div className={classes.container}>
      <FightContainer
        nextMatch={nextMatch}
        fight={fight}
        handleShowFight={handleShowFight}
      ></FightContainer>
    </div>
  ) : null;

  return (
    <div>
      {fighters.length > 1 ? currentBracket : null}
      {fighters.length}
      {tournamentOver ? <Balloons></Balloons> : null}
      {tournamentOver ? tournamentWinner : test}
    </div>
  );
};
export default Game;
