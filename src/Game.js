import React, { useEffect, useState } from "react";
import classes from "./Game.module.css";
import FightContainer from "./containers/FightContainer";
import Fighter from "./Fighter";
import { Howl, Howler } from "howler";

const Game = (props) => {
  const [fighters, setFighters] = useState([]);
  const [allFighters, setAllFighters] = useState();
  const [nextMatch, setNextMatch] = useState({});
  const [fight, setFight] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [tournamentOver, setTournamentOver] = useState(false);
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
      fetch(props.API_URL + props.tournamentId)
        .then((response) => response.json())
        .then((result) => {
          setFighters(result["fightersRemaining"]);
          setAllFighters(result["allFighters"].length);
        });
      playSound.play();
    }

    if (!loaded && !tournamentOver) {
      fetch(props.API_URL + props.tournamentId + "/upcoming")
        .then((nextMatchResponse) => nextMatchResponse.json())
        .then((nextMatchResult) => {
          fetch(props.API_URL + props.tournamentId + "/fight")
            .then((response) => response.json())
            .then((result) => {
              setNextMatch(nextMatchResult);
              setFight(result);
            })
            .then(() => setLoaded(true));
        });
    }
  }, [loaded, playSound, youWin, winSong]);

  const handleShowFight = (loser) => {
    setFighters((oldFighters) => {
      if (oldFighters.length === 2) {
        setTournamentOver(true);
        playSound.fade(0.5, 0, 1500);
        youWin.play();
    
        winSong.play();
      } else {
        setLoaded(false);
      }
      console.log(loser)
      return fighters.filter((f) => f.name !== loser.name);
    });
  };

  const numberOfFighters = fighters.length !== 0 ? fighters.length : -1;
  let currentBracket = "Kvartsfinal";

  if (numberOfFighters > 2 && numberOfFighters < allFighters / 2 + 1)
    currentBracket = "Semifinal";
  else if (numberOfFighters === 2) {
    currentBracket = "Final";
  } else if (numberOfFighters === 1) {
    currentBracket = "Vinnaren!";

  }
  console.log("FIGHTERS KVAR!", fighters);
  const tournamentWinner = loaded ? (
    <div className={classes.nextMatch}>
      <div>
        <h3>Mästaren av Java Fighters!</h3>
        <div className={classes.winnerContainer}>
          <img src={"images/chunli.gif"}></img>
          <Fighter
            name={fighters[0].name}
            health={fighters[0].health}
            wins={fighters[0].wins}
            losses={fighters[0].losses}></Fighter>
          <img src={"images/chunli.gif"}></img>
        </div>
      </div>
    </div>
  ) : null;

  const test = loaded ? (
    <div className={classes.container}>
      <FightContainer
        nextMatch={nextMatch}
        fight={fight}
        handleShowFight={handleShowFight}></FightContainer>
    </div>
  ) : null;

  return (
    <div>
      {fighters.length !== 0 ? (
        <h3 className={classes.bracket}>{currentBracket}</h3>
      ) : null}
      {tournamentOver ? tournamentWinner : test}
    </div>
  );
};
export default Game;
