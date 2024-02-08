export default function SelectedTrack({ spotifyHostId, selectedTrack, setSelectedTrack, baseUrl }) {
  // console.log(track);
  async function sendToVote(track) {
    track.spotifyHostid = spotifyHostId
    const response = await fetch(`${baseUrl}/api/songwishes`,
      {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(track)
      })
    const data = await response.json()
    setSelectedTrack(null)
  }

  return (
    <div className="TrackRow">
      <div className="TrackText">
        <img className='ThumbnailTwo' src={selectedTrack.image}></img>
        {selectedTrack.artistName} - {selectedTrack.name}
      </div>
      <button onClick={event => { sendToVote(selectedTrack) }} className='BtnSendToVote'>Send To Vote</button>

    </div>
  )
}