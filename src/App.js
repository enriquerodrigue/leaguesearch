import React, { useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {
  const [searchText, setSearchText] = useState("");
  const [playerData, setPlayerData] = useState({});
  const API_KEY = process.env.REACT_APP_API_KEY

  function searchForPlayer(event) {
    // Set up the correct API call
    var APICallString = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+ searchText + "?api_key=" + API_KEY;
    // Handle the API call
    axios.get(APICallString).then(function (response)  {
     // Success
     setPlayerData(response.data);
    }).catch(function (error) {
     // Error
     console.log(error);
   });
  }

  console.log(playerData)

  return (
    <div className="App">
      <div className="container">
        <h5>League of Legends Player Searcher</h5>
        <input type="text" onChange={e => setSearchText(e.target.value)}></input>
        <button onClick={e => searchForPlayer(e)}>Search for player</button>
      </div>
      {JSON.stringify(playerData) != '{}' ? 
      <>
        <p>{playerData.name}</p>
        <img width="100" height="100" src={"http://ddragon.leagueoflegends.com/cdn/13.13.1/img/profileicon/" + playerData.profileIconId + ".png"}></img>
        <p>Summoner level {playerData.summonerLevel}</p>
      </> 
      : 
      <><p>No player data</p></>
      
      }
    </div>
  );
}

export default App;
