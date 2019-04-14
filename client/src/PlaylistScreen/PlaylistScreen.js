import React, { Component } from "react";
import { withAuth } from "../context/AuthContext";
import { IoIosLink, IoIosMusicalNote } from "react-icons/io";

class PlaylistScreen extends Component {
  state = {
    playlists: [],
    tracks: "",
    playlist: [],
    currentTracks: [],
    isLoadingData: false,
    errorMessage: ""
  };

  componentDidMount() {
    this.setState(
      {
        playlists: this.props.authContext.playlists,
        tracks: this.props.authContext.playlists.map(
          playlist => playlist.tracks.href
        )
      },
      () => {
        const playlistId = this.props.match.params.playlistId;
        const playlist = this.state.playlists.find(
          playlist => playlist.id === playlistId
        );
        const tracks = playlist && Object.values(playlist.tracks)[0];
        this.setState(
          {
            playlist,
            tracks,
            isLoadingData: true
          },
          this.getTracks()
        );
      }
    );
  }

  static getDerivedStateFromProps(props, state) {
    if (
      state.playlist.id &&
      props.match.params.playlistId !== state.playlist.id
    ) {
      const playlistId = props.match.params.playlistId;
      const playlist = state.playlists.find(
        playlist => playlist.id === playlistId
      );
      const tracks = playlist && Object.values(playlist.tracks)[0];
      return {
        tracks,
        playlist
      };
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.tracks !== this.state.tracks) {
      fetch(`${this.state.tracks}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + this.props.authContext.token
        }
      })
        .then(response => response.json())
        .then(data =>
          this.setState({
            currentTracks: data.items,
            isLoadingData: false
          })
        )
        .catch(error => console.log(error.message));
    }
  }

  getTracks = () => {
    fetch(`${this.state.tracks[0]}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + this.props.authContext.token
      }
    })
      .then(response => response.json())
      .then(data =>
        this.setState({
          currentTracks: data.items,
          isLoadingData: false
        })
      )
      .catch(error => console.log(error.message));
  };

  render() {
    const playlistId = this.props.match.params.playlistId;
    const playlist = this.state.playlists.find(
      playlist => playlist.id === playlistId
    );
    const { currentTracks, isLoadingData } = this.state;
    return (
      <>
        {playlist && (
          <div className="current-playlist-container">
            <div className="current-playlist-info">
              <img src={playlist.images[0].url} />
              <div className="current-playlist-about">
                <a href={Object.values(playlist.external_urls)[0]}>
                  <IoIosMusicalNote style={{ verticalAlign: "sub" }} />
                  {playlist.name}
                </a>
                <p>{playlist.owner.display_name}</p>
              </div>
            </div>
            <div>
              {isLoadingData ? (
                <h1>Loading data...</h1>
              ) : (
                <table className="table-tracks">
                  <thead>
                    <tr>
                      <th>Track name</th>
                      <th>Track duration</th>
                      <th>Track url</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTracks &&
                      currentTracks.map(track => (
                        <tr>
                          <td>{track.track.name}</td>
                          <td>
                            {`${Math.floor(track.track.duration_ms / 60000)}:${(
                              (track.track.duration_ms % 60000) /
                              1000
                            ).toFixed(0)}`}
                          </td>
                          <td>
                            <a
                              className="btn-url"
                              target="_blank"
                              href={track.track.external_urls.spotify}
                            >
                              <IoIosLink style={{ verticalAlign: "sub" }} />
                            </a>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </>
    );
  }
}

export default withAuth(PlaylistScreen);
