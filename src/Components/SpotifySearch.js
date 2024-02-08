import React, { useState, useEffect } from 'react';

const client_id = 'f6f571dc4cb94b2b972c85a36c5d978f';
const client_secret = '7624beb1a32143ea9329f8ee1da2217d';

export default function SpotifySearch({setSelectedTrack}) {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [searchTracks, setSearchTracks] = useState([]);
  

  useEffect(() => {
    let authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + client_id + '&client_secret=' + client_secret
    }

    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token))
  }, [])

  // Searchfunction
  async function search() {
    console.log("search for " + searchInput);

    let searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }

    let trackResults = await fetch('https://api.spotify.com/v1/search?q=' + encodeURIComponent(searchInput) + '&type=track&limit=50', searchParameters)
      .then(response => response.json())
      .then(data => data.tracks.items.map(track => {
        const smallestAlbumImage = track.album.images.reduce(
          (smallest, image) => {
            if (image.height < smallest.height) return image;
            return smallest;
          },
          track.album.images[0]
        );

        return {
          artistName: track.artists[0].name,
          name: track.name,
          uri: track.uri,
          Image: smallestAlbumImage.url,
          spotifyId: track.id
        };
      }));

    setTracks(trackResults);
  }

  function selectTrack(id) {
    const track = searchTracks.find(track => track.spotifyId === id);
    setSelectedTrack(track);
    // console.log(track);
    setSearchTracks([]);
  }

 
  async function updateSearchText(text) {

    if (text.length === 0) {
      setSearchTracks([]);
      return;
    }
    let searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }

    let trackResults = await fetch('https://api.spotify.com/v1/search?q=' + encodeURIComponent(text) + '&type=track&limit=15', searchParameters)
      .then(response => response.json())
      .then(data => data.tracks.items.map(track => {
        const smallestAlbumImage = track.album.images.reduce(
          (smallest, image) => {
            if (image.height < smallest.height) return image;
            return smallest;
          },
          track.album.images[0]
        );

        return {
          artistName: track.artists[0].name,
          name: track.name,
          uri: track.uri,
          image: smallestAlbumImage.url,
          spotifyId: track.id,
        };
      }));
      console.log()

    setSearchTracks(trackResults);
    setSearchInput(text);
  }

 

  // function songAdded() {
  //   const message = "Song added!";
  //   alert(message);
  //   setTimeout(() => {
  //     const alertBox = document.getElementsByClassName('alert')[0];
  //     alertBox.style.display = 'none';
  //   }, 1000);
  // }


  return (
    <div className="SpotifySearch">
        <div className="LogoSearch">
          <img className="LogoSearchImage" src="../images/Logo.png"/>
          </div>
          <div className="SearchAddASongWish">
          <img className="SearchAddASongWishImage" src="../images/2.png"/>
          </div>
      <div className="SearchField">
        <input className="SearchBar"
          placeholder="Search for artist/song"
          type="input"
          onKeyDown={event => {
            if (event.key == "Enter") {
              search();
            }
          }}
          onChange={event => updateSearchText(event.target.value)}
        />
      </div>
      <div className="TrackList">
        {searchTracks.map((track, index) => {
          return (
            <div onClick={event => { selectTrack(track.spotifyId) }} id={track.spotifyId} key={index} className='TracksRow'>
              <img className='Thumbnail' src={track.image}></img>
              <div className="TextSearchRow">{track.artistName} - {track.name}</div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

// export default SpotifySearch;
