import React, { Component } from "react";
import { withAuth } from "../context/AuthContext";
import { RecentlyPlayedBox } from "../styled";

class RecentlyPlayed extends Component {
  state = {
    isPlaying: false
  };

  handleClick(playerId, event) {
    const players = document.querySelectorAll(".player-audio");
    let newArr = Array.from(players);
    let currentPlayer = newArr.filter(player => player.id === playerId);
    this.state.isPlaying ? currentPlayer[0].pause() : currentPlayer[0].play();
    this.setState({
      isPlaying: !this.state.isPlaying
    });
  }

  render() {
    return (
      <div>
        <h2 className="recently-played-info">Your recently played tracks</h2>
        <div className="recently-played-container">
          {this.props.authContext.withoutDuplicates() &&
            this.props.authContext.withoutDuplicates().map(item => (
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
                    <audio
                      className="player-audio"
                      src={item.track.preview_url}
                      id={item.track.id}
                    />
                  </div>
                  <button
                    className="btn"
                    onClick={e => this.handleClick(item.track.id, e)}
                  >
                    {this.state.isPlaying ? "PAUSE" : "PLAY"}
                  </button>
                </div>
              </RecentlyPlayedBox>
            ))}
        </div>
      </div>
    );
  }
}

export default withAuth(RecentlyPlayed);
