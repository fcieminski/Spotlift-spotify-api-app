import React, { Component } from "react";
import "./App.css";

const server = "http://localhost:8888/";

class App extends Component {
  state = {
    token: "",
    refreshToken: "",
    user: [],
    recentlyPlayed: [],
    playlists: [],
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
      // .then(data => Object.entries(data).map(({ id, value }) => [id, ...value]))
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

  moveSliderLeft = () => {
    const elementToSlide = document.querySelector(".playlist-slider");
    let i = window.innerWidth * 0.1;
    if (this.state.sliderPosition > -3500) {
      this.setState({
        sliderPosition: this.state.sliderPosition - i
      });
      elementToSlide.style.left = `${this.state.sliderPosition}px`;
    }
  };

  render() {
    return (
      <div>
        <a href="http://localhost:8888/login">
          <button>Log in with Spotify</button>
        </a>
        <p>{this.state.token}</p>
        <p>{this.state.refreshToken}</p>
        {/* {this.state.user &&
          this.state.user.map(user => (
            <div>
              <h1>{user.display_name}</h1>
              <p>{user.email}</p>
              <p>{user.followers.total}</p>
              <img src={user.images[0].url} />
            </div>
          ))} */}
        <div className="slider-controls">
          <p className="move-slider">{`<`} </p>
          <h2 className="header-text">Your Playlists</h2>
          <p onClick={this.moveSliderLeft} className="move-slider">
            {" "}
            >
          </p>
        </div>
        <section>
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
