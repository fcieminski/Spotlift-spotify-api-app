import React, { Component } from "react";
import { PlaylistImg, PlaylistBox, PlaylistContainer } from "../styled";
import { withAuth } from "../context/AuthContext";

class Playlist extends Component {
  state = {};

  render() {
    return (
      <PlaylistContainer>
        {this.props.authContext.playlists &&
          this.props.authContext.playlists.map(playlist => (
            <PlaylistBox
              className="playlist-box"
              id={playlist.id}
              key={playlist.id}
            >
              <a href={Object.values(playlist.external_urls)[0]}>
                <PlaylistImg>
                  <img src={playlist.images[0].url} />
                </PlaylistImg>
              </a>
              <div className="playlist-info">
                <a href={Object.values(playlist.external_urls)[0]}>
                  {playlist.name}
                </a>
                <h2>{playlist.owner.display_name}</h2>
              </div>
            </PlaylistBox>
          ))}
      </PlaylistContainer>
    );
  }
}

export default withAuth(Playlist);
