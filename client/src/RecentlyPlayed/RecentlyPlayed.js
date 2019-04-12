import React, { Component } from "react";
import { withAuth } from "../context/AuthContext";
import { RecentlyPlayedBox } from "../styled";
import ReactAudioPlayer from "react-audio-player";
import { IoIosFastforward } from "react-icons/io";

class RecentlyPlayed extends Component {
  render() {
    const { withoutDuplicates } = this.props.authContext;
    return (
      <div>
        <h2 className="recently-played-info">
          <IoIosFastforward
            style={{ verticalAlign: "sub", marginRight: "5px" }}
          />
          Your recently played tracks
        </h2>
        <div className="recently-played-container">
          {withoutDuplicates() &&
            withoutDuplicates().map(item => (
              <RecentlyPlayedBox>
                <img
                  className="recently-played-img"
                  src={item.track.album.images[1].url}
                />
                <div className="recently-played-about">
                  <div>
                    <h2>
                      {item.track.artists.map(artist => `${artist.name}`)}:{" "}
                      {item.track.name}
                    </h2>
                    <p>Album: {item.track.album.name}</p>
                  </div>
                  <ReactAudioPlayer
                    className="player-audio"
                    src={item.track.preview_url}
                    id={item.track.id}
                    controls
                  />
                </div>
              </RecentlyPlayedBox>
            ))}
        </div>
      </div>
    );
  }
}

export default withAuth(RecentlyPlayed);
