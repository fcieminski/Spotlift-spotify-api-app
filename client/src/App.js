import React, { Component } from "react";
import "./App.css";

const server = "http://localhost:8888/";

class App extends Component {
  state = {
    token: "",
    refreshToken: "",
    user: [],
    recentlyPlayed: []
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
      .then(response => response.json())
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
    fetch("https://api.spotify.com/v1/me/playlists ", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(response => response.json())
      .then(data =>
        this.setState({
          playlist: data.items
        })
      );
  };

  getNewToken = () => {
    fetch("http://localhost:8888/refresh_token", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + this.state.refreshToken
      }
    });
  };

  componentDidMount() {
    this.getSpotifyToken();
    this.getNewToken();
  }

  render() {
    return (
      <div>
        <a href="http://localhost:8888/login">
          <button>Log in with Spotify</button>
        </a>
        <p>{this.state.token}</p>
        <p>{this.state.refreshToken}</p>
        {this.state.user &&
          this.state.user.map(user => (
            <div>
              <h1>{user.display_name}</h1>
              <p>{user.email}</p>
              <p>{user.followers.total}</p>
              <img src={user.images[0].url} />
              {console.log(this.state.recentlyPlayed)}
              {this.state.recentlyPlayed &&
                this.state.recentlyPlayed.map(item => (
                  <div>
                    <h2>
                      <img src={item.track.album.images[1].url} />
                      {`Album: ${item.track.album.name}`}
                    </h2>
                    <h2>
                      {item.track.artists.map(artist => `${artist.name} `)}
                    </h2>
                    <p>{item.track.name}</p>
                    <audio src={item.track.preview_url} controls>
                      <embed
                        src={item.track.preview_url}
                        width="300"
                        height="90"
                        loop="false"
                        autostart="false"
                      />
                    </audio>
                  </div>
                ))}
            </div>
          ))}
      </div>
    );
  }
}

export default App;
