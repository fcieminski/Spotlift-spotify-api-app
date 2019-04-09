import React, { Component } from "react";
import { withAuth } from "../context/AuthContext";
import { RecentlyPlayedBox } from "../styled";

class RecentlyPlayed extends Component {
  render() {
    return (
      <div>
        {this.props.authContext.withoutDuplicates().map(item => (
          <RecentlyPlayedBox>
            <div className="recently-played-imagebox">
              <h2>{item.track.album.name}</h2>
              <img src={item.track.album.images[1].url} />
            </div>
            <div className="recently-played-about">
              <h2>{item.track.artists.map(artist => `${artist.name} `)}</h2>
              <p>{item.track.name}</p>
            </div>
            <audio src={item.track.preview_url} controls>
              <embed
                src={item.track.preview_url}
                loop="false"
                autostart="false"
              />
            </audio>
          </RecentlyPlayedBox>
        ))}
      </div>
    );
  }
}

export default withAuth(RecentlyPlayed);
