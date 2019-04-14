import React, { Component } from "react";
import { PlaylistImg, PlaylistBox, PlaylistContainer } from "../styled";
import { withAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { IoIosMusicalNotes } from "react-icons/io";

class Playlist extends Component {
  render() {
    const { playlists } = this.props.authContext;
    return (
      <div>
        <h2 className="recently-played-info">
          <IoIosMusicalNotes
            style={{ verticalAlign: "sub", marginRight: "5px" }}
          />
          Your playlists
        </h2>
        <PlaylistContainer>
          {playlists ? (
            playlists.map(playlist => (
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
            ))
          ) : (
            <h2>You have no playlists</h2>
          )}
        </PlaylistContainer>
      </div>
    );
  }
}

export default withAuth(Playlist);
