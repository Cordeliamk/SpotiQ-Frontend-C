import { useEffect, useState } from "react";

export default function PollWinner({ renderPoll, pollInfo, setPollInfo, pageState, setPageState }) {
  const [track, setTrack] = useState(null)
  //   const pollInfo = await response.json
   async function getWinner (pollId) {
    const response = await fetch(`${pageState.baseUrl}/api/polls/winner?pollId=` + pollId)
    const track = await response.json();
    return track
  }

  useEffect(() => {
    async function fetchData() {
      // const pollId = 65
      const data = await getWinner(pollInfo.pollId);
      setTrack(data);
      console.log(data);
    }
    fetchData();
    const interval = setTimeout(
      () => { setPollInfo(null); renderPoll()},
      11000
    );
    return () => clearTimeout(interval);
  }, [])
  return (
    <div className="WinnerBox">
      <img className="WinnerHeader" src="../images/thewinneris.png"/>
      <div className="WinnerRow">
      <div className="WinnerTrack">
        {(track && track.songName )&& <div>{track.artistName} - {track.songName}</div>
        }
      </div>

    </div>
    <img className="WinnerGetReady" src="../images/getready.png"/>
    </div>
    
  )
};