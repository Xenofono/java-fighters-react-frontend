import React, { useEffect, useState } from "react";
import classes from "./Game.module.css";
import Fighter from "./Fighter";
import Balloons from "./UI/Balloons.js";
import NextFight from "./containers/NextFight";

const API_URL = "https://peaceful-dawn-33157.herokuapp.com/api/";

const Game = props => {
  const [tournamentId, setTournamentId] = useState("");
  const [fighters, setFighters] = useState([]);
  const [nextMatch, setNextMatch] = useState({});

  useEffect(() => {
    if (tournamentId !== "") {
      fetch(API_URL + tournamentId)
        .then(response => response.json())
        .then(result => setFighters(result["fightersRemaining"]));

      fetch(API_URL + tournamentId + "/upcoming")
        .then(response => response.json())
        .then(result => {
          setNextMatch(result);
        });
    }
  }, [tournamentId]);

  const handleNewTournament = () => {
    fetch(API_URL + "new")
      .then(response => response.json())
      .then(result => setTournamentId(result["id"]));
  };

  const toShow =
    typeof nextMatch["fighter1"] === "undefined" ? (
      <div>
        <button onClick={handleNewTournament}>Starta ny turnering</button>
      </div>
    ) : (
      <div className={classes.container}>
        <h2>Turneringen har börjat!</h2>
        <NextFight fighters={nextMatch}></NextFight>
      </div>
    );

  const fightersToShow =
    fighters.length !== 0
      ? fighters.map(f => {
          return (
            <Fighter
              name={f.name}
              health={f.health}
              wins={f.wins}
              losses={f.losses}
            ></Fighter>
          );
        })
      : null;

  return (
    <div>
      <h1 class="chrome">JAVA</h1>
      <h3 class="dreams">Fighters</h3>
      {toShow}
      {/* <Balloons></Balloons> */}

      {/* {fightersToShow} */}
    </div>
  );
};
export default Game;
