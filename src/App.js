import React, { useState } from 'react';
import axios from 'axios';
import emblems from './assets';
import logo from './logo.svg';
import './App.css';

function App() {
  const [searchText, setSearchText] = useState("");
  const [playerData, setPlayerData] = useState({});
  const [rankedPlayerData, setRankedPlayerData] = useState({});
  const API_KEY = process.env.REACT_APP_API_KEY
  var id

  function searchForPlayer(event) {
    // Set up the correct API call
    var APICallPlayerStr = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+ searchText + "?api_key=" + API_KEY;
    // Handle the API call
    axios.get(APICallPlayerStr).then(function (response)  {
     // Success
     setPlayerData(response.data);
     id = response.data.id
     getRankData()
    }).catch(function (error) {
     // Error
     console.log(error);
   });
  }

  function getRankData() {
    // Deeper API call
    var APICallRankStr = "https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/" + id + "?api_key=" + API_KEY;
    // Handle API call
    axios.get(APICallRankStr).then(function (response)  {
    // Success
    setRankedPlayerData(response.data[0]);
    }).catch(function(error)  {
      // Error
      console.log(error)
    });
  }

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
        <img width="600" height="400" src={emblems[rankedPlayerData.tier]}></img>
      </> 
      : 
      <><p>No player data</p></>
      
      }
    </div>
  );
}

export default App;
