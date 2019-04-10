import React, { Component } from "react";
import { withAuth } from "../context/AuthContext";

class PlaylistScreen extends Component {
  state = {
    playlists: [],
    tracks: "",
    playlist: [],
    currentTracks: []
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
            tracks
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
      console.log("component update!");
      fetch(`${this.state.tracks}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + this.props.authContext.token
        }
      })
        .then(response => response.json())
        .then(data =>
          this.setState({
            currentTracks: data.items
          })
        );
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
          currentTracks: data.items
        })
      );
  };

  render() {
    const playlistId = this.props.match.params.playlistId;
    const playlist = this.state.playlists.find(
      playlist => playlist.id === playlistId
    );
    return (
      <>
        {playlist && (
          <div className="current-playlist-container">
            <div className="current-playlist-info">
              <img src={playlist.images[0].url} />
              <div>
                <a href={Object.values(playlist.external_urls)[0]}>
                  {playlist.name}
                </a>
                {playlist.owner.display_name}
              </div>
            </div>
            <div>
              <table className="table-tracks">
                <thead>
                  <tr>
                    <th>Track name</th>
                    <th>Track duration</th>
                    <th>Track url</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.currentTracks &&
                    this.state.currentTracks.map(track => (
                      <tr>
                        <td>{track.track.name}</td>
                        <td>{track.track.duration_ms}</td>
                        <td>{track.track.external_urls.spotify}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default withAuth(PlaylistScreen);
