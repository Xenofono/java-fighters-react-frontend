import React, { useEffect, useState, useContext } from "react";
import classes from "./Game.module.css";
import FightContainer from "./containers/FightContainer";
import Fighter from "./Fighter";
import Spinner from './UI/Spinner'
import {ApiContext} from './ApiContext'
import { Howl } from "howler";

const Game = props => {
  const {baseURL} = useContext(ApiContext)
  const [fighters, setFighters] = useState([]);
  const [allFighters, setAllFighters] = useState();
  const [nextMatch, setNextMatch] = useState({});
  const [fight, setFight] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [playSound] = useState(
    new Howl({
      src: ["sound/Ken Stage.mp3"],
      volume: 0.5,
      rate: 1,
      html5: true
    })
  );
  const [youWin] = useState(
    new Howl({
      src: ["sound/win.mp3"],
      volume: 0.5,
      rate: 1,
      html5: true
    })
  );
  const [winSong] = useState(
    new Howl({
      src: ["sound/Guile Stage.mp3"],
      volume: 0.5,
      rate: 1,
      html5: true
    })
  );

  useEffect(() => {
    if (fighters.length === 0) {
      fetch(baseURL + props.tournamentId)
        .then(response => response.json())
        .then(result => {
          setFighters(result["fightersRemaining"]);
          setAllFighters(result["allFighters"].length);
        });
      playSound.play();
    }

    //first get upcoming fight and THEN activate it
    if (!loaded && fighters.length !== 1) {
      fetch(baseURL + props.tournamentId + "/upcoming")
        .then(nextMatchResponse => nextMatchResponse.json())
        .then(nextMatchResult => {
          fetch(baseURL + props.tournamentId + "/fight")
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
        playSound.fade(0.5, 0, 1500);
        youWin.play();

        winSong.play();
      } else {
        setLoaded(false);
      }
      console.log(loser);
      return fighters.filter(f => f.name !== loser.name);
    });
  };

  const bracketCalculator = (fightersLeft) => {
    let currentBracket = "Kvartsfinal";
    if (fightersLeft > 2 && fightersLeft < allFighters / 2 + 1)
      currentBracket = "Semifinal";
    else if (fightersLeft === 2) {
      currentBracket = "Final";
    } else if (fightersLeft === 1) {
      currentBracket = "Vinnaren!";
    }
    return currentBracket;
  }

  const numberOfFighters = fighters.length !== 0 ? fighters.length : -1;
  const currentBracket = bracketCalculator(fighters.length)

  console.log("FIGHTERS KVAR!", fighters);
  const tournamentWinner = loaded ? (
    <div className={classes.nextMatch}>
      <div>
        <h3>Mästaren av Java Fighters!</h3>
        <div className={classes.winnerContainer}>
          <img src={"images/chunli.gif"} alt="chunli"></img>
          <Fighter fighter={fighters[0]} fight></Fighter>
          <img src={"images/chunli.gif"}alt="chunli"></img>
        </div>
      </div>
    </div>
  ) : <Spinner></Spinner>;

  const fightContainer = loaded ? (
    <div className={classes.container}>
      <FightContainer
        nextMatch={nextMatch}
        fight={fight}
        handleShowFight={handleShowFight}
      ></FightContainer>
    </div>
  ) : <Spinner></Spinner>;

  return (
    <div className={classes.Game}>
      {fighters.length !== 0 ? (
        <h3 className={classes.bracket}>{currentBracket}</h3>
      ) : null}
      {numberOfFighters === 1 ? tournamentWinner : fightContainer}
    </div>
  );
};
export default Game;
