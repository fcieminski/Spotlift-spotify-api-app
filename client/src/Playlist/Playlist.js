import React, { Component } from "react";
import { PlaylistImg, PlaylistBox, PlaylistContainer } from "../styled";
import { withAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { IoIosMusicalNotes } from "react-icons/io";

class Playlist extends Component {
  render() {
    return (
      <div>
        <h2 className="recently-played-info">
          <IoIosMusicalNotes
            style={{ verticalAlign: "sub", marginRight: "5px" }}
          />
          Your playlists
        </h2>
        <PlaylistContainer>
          {this.props.authContext.playlists &&
            this.props.authContext.playlists.map(playlist => (
              <Link to={`/playlist/${playlist.id}`}>
                <PlaylistBox
                  className="playlist-box"
                  id={playlist.id}
                  key={playlist.id}
                >
                  <PlaylistImg>
                    <img src={playlist.images[0].url} />
                  </PlaylistImg>
                  <div className="playlist-info">
                    <p>{playlist.name}</p>
                    <h2>{playlist.owner.display_name}</h2>
                  </div>
                </PlaylistBox>
              </Link>
            ))}
        </PlaylistContainer>
      </div>
    );
  }
}

export default withAuth(Playlist);
