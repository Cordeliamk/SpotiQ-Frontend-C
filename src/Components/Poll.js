import React, { useEffect } from "react";
// import SpotifySearch from "./SpotifySearch";
import VoteTimer from './VoteTimer';

export default function Poll({ renderSpotifySearch, spotifyHostId, pollInfo, setPollInfo, pageState, setPageState }) {


  async function getPoll() {
    const response = await fetch(`${pageState.baseUrl}/api/polls/current/` + spotifyHostId);
    const data = await response.json();
    return data;
  }
  async function fetchData() {
    const data = await getPoll();
    setPollInfo(data);
    return data;
  }
  useEffect(() => {
    const poll = fetchData().then(data => data);
    console.log("poll: " + poll);
    
  }, []);
  useEffect(() => {
    if (!pollInfo) {
      const interval = setInterval(
        () => {
          const localPoll = fetchData();
          console.log("poll: " + pollInfo);
          // if (localPoll) {
          //   return () => clearInterval(interval);
          // }
        },
        3000
      );
      return () => clearInterval(interval);
    }
  }, [pollInfo])

  async function submitVote(e, track) {
    // console.log(track)
    // const pollTracksElement = document.querySelector(".PollTracksList")
    // e.target.classList.add("btnSubmittedVote")
    // pollTracksElement.classList.add("PollTracksListDeactivated")
    const response = await fetch(`${pageState.baseUrl}/api/polls/votes/` + track.pollSongId,
      {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(track)
      })
    const data = await response.json()
    console.log("Stemmer på ", track)
    setPageState({
      ...pageState, votedTrack: track
    })

  }
  if (pollInfo) {
    return (
      <div className="SpotifySearch">
        <div className="LogoSearch">
          <img className="LogoSearchImage" src="../images/Logo.png" />
        </div>
        <div className="SearchAddASongWish">
          <img className="SearchAddASongWishImage" src="../images/3.png" />
        </div>
        <div>
          <VoteTimer endTime={pollInfo.endTime}
            pollInfo={pollInfo} setPollInfo={setPollInfo}
            setPageState={setPageState} pageState={pageState} />
        </div>
        <div className="PollTracksList">
          {pollInfo.tracks.map((track, index) => (
            <div key={track.pollSongId}>
              <div className="TrackRow">
                <div className="TrackText">
                  {track.artistName} - {track.songName}
                </div>
                <button onClick={event => { submitVote(event, track) }} 
                 className={ pageState.votedTrack && pageState.votedTrack.pollSongId == track.pollSongId
                   ? "BtnSendToVote btnSubmittedVote"
                  : "BtnSendToVote" }>
                  Vote </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="NoPollBox">
        <img className="ImageNoPoll" src="../images/woops.png" />
        <button onClick={renderSpotifySearch} className="BtnSongWish2">
          <img className="ImageMakeASongWish2" src="../images/more.png" /></button>
      </div>
    )
  }
}






