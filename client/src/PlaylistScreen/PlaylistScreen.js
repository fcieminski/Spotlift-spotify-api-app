import React, { Component } from "react";
import { withAuth } from "../context/AuthContext";

class PlaylistScreen extends Component {
  state = {
    playlists: [],
    tracksUrl: "",
    tracks: []
  };

  componentDidMount() {
    this.setState({
      playlists: this.props.authContext.playlists
    });
  }

  getTracks = () => {
    fetch(`${this.state.tracksUrl}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + this.props.authContext.token
      }
    })
      .then(response => response.json())
      .then(data =>
        this.setState({
          tracks: data.items
        })
      );
  };

  render() {
    const playlistId = this.props.match.params.playlistId;
    const playlist = this.state.playlists.find(
      playlist => playlist.id === playlistId
    );
    const tracks = playlist && Object.values(playlist.tracks)[0];
    return (
      <>
        {playlist && (
          <div>
            <div>
              <img src={playlist.images[0].url} />
              <div>
                <a href={Object.values(playlist.external_urls)[0]}>
                  {playlist.name}
                </a>
                {playlist.owner.display_name}
              </div>
            </div>
            <div>
              <button
                onClick={() =>
                  this.setState(
                    {
                      tracksUrl: tracks
                    },
                    this.getTracks()
                  )
                }
              >
                Show tracks
              </button>
              <table>
                <thead>
                  <tr>
                    <th>Track name</th>
                    <th>Track duration</th>
                    <th>Track url</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.tracks &&
                    this.state.tracks.map(track => (
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
