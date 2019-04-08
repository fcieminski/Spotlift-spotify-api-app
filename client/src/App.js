import React, { Component } from "react";
import "./App.css";
import arrowNext from "./img/forward.svg";
import arrowBack from "./img/backward.svg";

const server = "http://localhost:8888/";

class App extends Component {
  state = {
    token: "",
    refreshToken: "",
    user: [],
    recentlyPlayed: null,
    playlists: null,
    sliderPosition: 0
  };

  getSpotifyToken = () => {
    const fragment = window.location.pathname;
    if (fragment) {
      const match = fragment.match(/access_token=(.*)[(^&)]/);
      const refreshMatch = fragment.match(/refresh_token=(.*)/);
      if (match) {
        const token = match[1].toString().slice(match[1] - 1);
        const refreshToken = refreshMatch[1]
          .toString()
          .slice(refreshMatch[1] - 1);
        this.setState(
          {
            token,
            refreshToken
          },
          this.getUserInfo(token)
        );
      }
    }
  };

  getUserInfo = token => {
    fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return this.getNewToken();
        }
      })
      .then(user => this.setState({ user: [user] }))
      .catch(error => console.log(error.message));
    fetch("https://api.spotify.com/v1/me/player/recently-played", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(response => response.json())
      .then(data =>
        this.setState({
          recentlyPlayed: data.items
        })
      );
    fetch("https://api.spotify.com/v1/me/playlists", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(response => response.json())
      .then(data =>
        this.setState({
          playlists: data.items
        })
      );
  };

  componentDidMount() {
    this.getSpotifyToken();
  }

  withoutDuplicates = () => {
    return this.state.recentlyPlayed.filter(
      (element, index, self) =>
        self.map(item => item.track.name).indexOf(element.track.name) === index
    );
  };

  moveSliderRight = () => {
    const elementToSlide = document.querySelector(".playlist-slider");
    const allPlaylistsBoxes = document.querySelectorAll(".playlist-box");
    const onePlaylistBox = document.querySelector(".playlist-box").clientWidth;
    if (this.state.sliderPosition < allPlaylistsBoxes.length - 1) {
      elementToSlide.style.left = `${parseInt(elementToSlide.style.left) -
        onePlaylistBox}px`;
      this.setState({
        sliderPosition: (this.state.sliderPosition += 1)
      });
    }
  };

  moveSliderLeft = () => {
    const elementToSlide = document.querySelector(".playlist-slider");
    if (this.state.sliderPosition > 0) {
      elementToSlide.style.left = "0px";
      this.setState({
        sliderPosition: 0
      });
    }
  };

  render() {
    return (
      <div>
        <nav>
          <a href="http://localhost:8888/login">
            <button>Log in with Spotify</button>
          </a>
        </nav>
        {this.state.playlists ? (
          <div className="slider-controls">
            <button onClick={this.moveSliderLeft} className="move-slider">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="backward"
                class="svg-inline--fa fa-backward fa-w-16"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M11.5 280.6l192 160c20.6 17.2 52.5 2.8 52.5-24.6V96c0-27.4-31.9-41.8-52.5-24.6l-192 160c-15.3 12.8-15.3 36.4 0 49.2zm256 0l192 160c20.6 17.2 52.5 2.8 52.5-24.6V96c0-27.4-31.9-41.8-52.5-24.6l-192 160c-15.3 12.8-15.3 36.4 0 49.2z"
                />
              </svg>
            </button>
            <h2 className="header-text">Your Playlists</h2>
            <button onClick={this.moveSliderRight} className="move-slider">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="forward"
                class="svg-inline--fa fa-forward fa-w-16"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M500.5 231.4l-192-160C287.9 54.3 256 68.6 256 96v320c0 27.4 31.9 41.8 52.5 24.6l192-160c15.3-12.8 15.3-36.4 0-49.2zm-256 0l-192-160C31.9 54.3 0 68.6 0 96v320c0 27.4 31.9 41.8 52.5 24.6l192-160c15.3-12.8 15.3-36.4 0-49.2z"
                />
              </svg>
            </button>
          </div>
        ) : (
          <h2 className="header-text">Log in first</h2>
        )}
        <section className="slider-container">
          <div style={{ left: "0px" }} className="playlist-slider">
            {this.state.playlists &&
              this.state.playlists.map(playlist => (
                <div className="playlist-box">
                  <a href={Object.values(playlist.external_urls)[0]}>
                    <div className="playlist-image">
                      <img src={playlist.images[0].url} />
                    </div>
                  </a>
                  <div className="playlist-info">
                    <a href={Object.values(playlist.external_urls)[0]}>
                      {playlist.name}
                    </a>
                    <h2>{playlist.owner.display_name}</h2>
                  </div>
                </div>
              ))}
          </div>
        </section>
        {this.state.recentlyPlayed && (
          <h2 className="header-text">Recently played</h2>
        )}
        <main>
          {this.state.recentlyPlayed &&
            this.withoutDuplicates().map(item => (
              <div className="recently-played-container">
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
              </div>
            ))}
        </main>
      </div>
    );
  }
}

export default App;
