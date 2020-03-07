import React, { useState } from "react";
import Button from "./UI/Button";
import Game from "./Game";
import classes from "./App.module.css";

const API_URL = "https://peaceful-dawn-33157.herokuapp.com/api/";

function App() {
  const [tournamentId, setTournamentId] = useState("");

  const handleNewTournament = () => {
    fetch(API_URL + "new")
      .then(response => response.json())
      .then(result => setTournamentId(result["id"]));
  };

  return (
    <div className={classes.App}>
      <h1 className={classes.chrome}>JAVA</h1>
      <h3 className={classes.dreams}>Fighters</h3>
      {tournamentId === "" ? (
        <Button size={40} click={handleNewTournament} top={300}>
          Starta ny turnering
        </Button>
      ) : (
        <Game tournamentId={tournamentId} API_URL={API_URL}></Game>
      )}
    </div>
  );
}

export default App;
