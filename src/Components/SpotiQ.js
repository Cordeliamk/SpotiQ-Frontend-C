import React, { useState, useEffect } from "react"
import SpotifySearch from './SpotifySearch';
import Poll from './Poll';
import SelectedTrack from './SelectedTrack';
import PollWinner from './PollWinner';
import 'bootstrap/dist/css/bootstrap.min.css';


function SpotiQ({ renderSpotifySearch, renderPoll, renderSpotiQ, spotifyHostId, pollInfo, setPollInfo, pageState, setPageState }) {
  const [submitVote, setSubmitVote] = useState(false);

  function setSelectedTrack(selectedTrack) {
    setPageState({...pageState, selectedTrack: selectedTrack})
  }

  return (
    <div>
      {!pageState.button && (
        <>
          <div>
            <div className="logo">
              <img className="LogoFront" src="../images/Logo.png" />
            </div>
            <button onClick={renderSpotifySearch} className="BtnSongWish">
              <img className="ImageMakeASongWish" src="../images/2.png" /></button>
            <button onClick={renderPoll} className="BtnAddToVote">
              <img className="ImageSendToVote" src="../images/3.png" /></button>

          </div>
        </>
      )}
      {pageState.showWinner && <PollWinner spotifyHostId={spotifyHostId}
        renderPoll={renderPoll}
        pollInfo={pollInfo} setPollInfo={setPollInfo}
        pageState={pageState} setPageState={setPageState} />}
      {pageState.poll && <Poll renderSpotiQ={renderSpotiQ} spotifyHostId={spotifyHostId} renderSpotifySearch={renderSpotifySearch}
        pollInfo={pollInfo} setPollInfo={setPollInfo} pageState={pageState} setPageState={setPageState} />}
      {pageState.spotify && <SpotifySearch setSelectedTrack={setSelectedTrack} />}
      {pageState.selectedTrack && <SelectedTrack spotifyHostId={spotifyHostId} selectedTrack={pageState.selectedTrack} setSelectedTrack={setSelectedTrack} baseUrl={pageState.baseUrl}/>}


    </div>
  );
}
export default SpotiQ;