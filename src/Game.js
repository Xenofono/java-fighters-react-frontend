import React, { useEffect, useState, useContext } from "react";
import classes from "./Game.module.css";
import FightContainer from "./containers/FightContainer";
import Fighter from "./Fighter";
import Spinner from "./UI/Spinner";
import { ApiContext } from "./ApiContext";
import { Howl } from "howler";

const Game = (props) => {
  const { baseURL } = useContext(ApiContext);
  const [fighters, setFighters] = useState([]);
  const [allFighters, setAllFighters] = useState();
  const [nextMatch, setNextMatch] = useState({});
  const [fight, setFight] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [selectedFighter, setSelectedFighter] = useState(null);
  const [bettingSum, setBettingSum] = useState(0);
  const [totalSum, setTotalSum] = useState(1000);
  const [showBetting, setShowBetting] = useState(true);
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
        .then((response) => response.json())
        .then((result) => {
          setFighters(result["fightersRemaining"]);
          setAllFighters(result["allFighters"].length);
        });
      playSound.play();
    }

    //first get upcoming fight and THEN activate it
    if (!loaded && fighters.length !== 1) {
      fetch(baseURL + props.tournamentId + "/upcoming")
        .then((nextMatchResponse) => nextMatchResponse.json())
        .then((nextMatchResult) => {
          fetch(baseURL + props.tournamentId + "/fight")
            .then((response) => response.json())
            .then((result) => {
              setNextMatch(nextMatchResult);
              setFight(result);
            })
            .then(() => setLoaded(true));
        });
    }
  }, [loaded]);

  const handleSelectFighter = (name) => {
    const selectedFighter = fighters.filter((f) => f.name === name)[0];
    console.log(selectedFighter);
    setSelectedFighter(selectedFighter);
  };

  const showBettingHandler = () => {
    setShowBetting(!showBetting);
  };

  const handleShowFight = (loser) => {
    setFighters((oldFighters) => {
      if (oldFighters.length === 2) {
        playSound.fade(0.5, 0, 1500);
        youWin.play();
        winSong.play();
      } else {
        setLoaded(false);
        calculateNewSum();
        setSelectedFighter(null);
      }
      setShowBetting(true);
      return fighters.filter((f) => f.name !== loser.name);
    });
  };

  const calculateNewSum = () => {
    if (selectedFighter) {
      if (selectedFighter.name === fight.winner.name) {
        setTotalSum((oldTotal) => oldTotal + bettingSum * fight.winner.odds);
      } else {
        setTotalSum((oldSum) => oldSum - bettingSum);
      }
    }
    setBettingSum(0);
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
  };

  const numberOfFighters = fighters.length !== 0 ? fighters.length : -1;
  const currentBracket = bracketCalculator(fighters.length);

  const handleInputEl = (e) => {
    const newSum = +e.target.value;
    if (newSum <= totalSum) {
      setBettingSum(e.target.value);
    }
  };

  const bettingSection =
    numberOfFighters !== 1 ? (
      <div>
        <h4>Satsa på din fighter</h4>
        <p>
          Fighter vald: {selectedFighter ? selectedFighter.name : "EJ VALD"}
        </p>
        <p>Total summa: {totalSum}</p>
        <input
          value={bettingSum}
          inputmode="numeric"
          pattern="[0-9]*"
          onChange={handleInputEl}
        />
      </div>
    ) : (
      <div>
        <p>Du tjänade {totalSum}!</p>
      </div>
    );

  const tournamentWinner = loaded ? (
    <div className={classes.nextMatch}>
      <div>
        <h3>Mästaren av Java Fighters!</h3>
        <div className={classes.winnerContainer}>
          <img src={"images/chunli.gif"} alt="chunli"></img>
          <Fighter fighter={fighters[0]} fight></Fighter>
          <img src={"images/chunli.gif"} alt="chunli"></img>
        </div>
      </div>
    </div>
  ) : (
    <Spinner></Spinner>
  );

  const fightContainer = loaded ? (
    <div className={classes.container}>
      <FightContainer
        nextMatch={nextMatch}
        fight={fight}
        handleShowFight={handleShowFight}
        handleSelectFighter={handleSelectFighter}
        handleShowBetting={showBettingHandler}></FightContainer>
    </div>
  ) : (
    <Spinner></Spinner>
  );

  return (
    <div className={classes.Game}>
      {fighters.length !== 0 ? (
        <h3 className={classes.bracket}>{currentBracket}</h3>
      ) : null}
      {showBetting ? bettingSection : null}

      {numberOfFighters === 1 ? tournamentWinner : fightContainer}
    </div>
  );
};
export default Game;
