import React, {useState, useEffect} from 'react';
import Button from './UI/Button'
import Game from './Game'
import './App.css';

const API_URL = "https://peaceful-dawn-33157.herokuapp.com/api/";

function App() {

  const [tournamentId, setTournamentId] = useState("")


  const handleNewTournament = () => {
    fetch(API_URL + "new")
      .then(response => response.json())
      .then(result => setTournamentId(result["id"]));
  };


  return (
    <div className="App">
      <h1 className="chrome">JAVA</h1>
      <h3 className="dreams">Fighters</h3>
      {tournamentId === "" ? (
        <Button size={40} click={handleNewTournament}>
          Starta ny turnering
        </Button>
      ) : <Game tournamentId={tournamentId}></Game>}
    </div>
  );
}

export default App;
