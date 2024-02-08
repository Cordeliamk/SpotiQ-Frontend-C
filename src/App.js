import './App.css';
import React from 'react';
import SpotiQ from './Components/SpotiQ';
import NavBar from './Components/Navbar';
import { useState } from "react"
import { useAccordionButton } from 'react-bootstrap';


const devBaseUrl = "https://localhost:7216";
const prodBaseUrl = "https://spotiq-backend-beta.azurewebsites.net";
const baseUrl = devBaseUrl;


function App() {
  const [pageState, setPageState] = useState({
    poll: false,
    showWinner: false,
    spotify: false,
    button: false,
    selectedTrack: null,
    votedTrack: null,
    baseUrl: baseUrl
  })
  const [pollInfo, setPollInfo] = useState(null);
  const [spotifyHostId, setSpotifyHostId] = useState(1)

  const renderPoll = () => {
    setPageState({
      poll: true,
      showWinner: false,
      spotify: false,
      button: true,
      selectedTrack: null,
      baseUrl: baseUrl
    })

  };

  const renderSpotifySearch = () => {
    setPageState({
      poll: false,
      showWinner: false,
      spotify: true,
      button: true,
      selectedTrack: null,
      baseUrl: baseUrl
    })
  };

  const renderSpotiQ = () => {
    setPageState({
      poll: false,
      showWinner: false,
      spotify: false,
      button: false,
      selectedTrack: null,
      baseUrl: baseUrl
    })
  };

  return (
    <div className="App">
      <NavBar
        renderSpotifySearch={renderSpotifySearch} 
        renderPoll={renderPoll} 
        renderSpotiQ={renderSpotiQ} 
        pageState={pageState}
        setPageState={setPageState}
      >
      </NavBar>
      <SpotiQ
        spotifyHostId={spotifyHostId}
        pollInfo={pollInfo} setPollInfo={setPollInfo}
        renderSpotifySearch={renderSpotifySearch}
        renderPoll={renderPoll}
        renderSpotiQ={renderSpotiQ}
        pageState={pageState}
        setPageState={setPageState}>
      </SpotiQ>
    </div>
  );
}
export default App;
