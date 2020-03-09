import React, { useState } from "react";
import Button from "./UI/Button";
import Game from "./Game";
import Spinner from "./UI/Spinner";
import classes from "./App.module.css";

const API_URL = "https://peaceful-dawn-33157.herokuapp.com/api/";

function App() {
  const [tournamentId, setTournamentId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleNewTournament = () => {
    setLoading(true);
    fetch(API_URL + "new")
      .then(response => response.json())
      .then(result => {
        setTournamentId(result["id"]);
        setLoading(false);
      });
  };

  const buttonOrLoader = !loading ? (
    <Button size={40} click={handleNewTournament} top={300}>
      Starta ny turnering
    </Button>
  ) : (
    <div className={classes.Loading}>
      <h3 className={classes.dreams}>Fighters byter om, ta det lugnt</h3>
      <Spinner></Spinner>
    </div>
  );

  return (
    <div className={classes.App}>
      <h1 className={classes.chrome}>JAVA</h1>
      <h3 className={classes.dreams}>Fighters</h3>
      {!tournamentId ? buttonOrLoader : null}
      {tournamentId ? (
        <Game tournamentId={tournamentId} API_URL={API_URL}></Game>
      ) : null}
    </div>
  );
}

export default App;
