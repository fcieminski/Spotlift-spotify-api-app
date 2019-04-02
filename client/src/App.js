import React, { Component } from "react";
import "./App.css";

const server = "http://localhost:8888/callback";

class App extends Component {
  state = {
    token: "",
    refreshToken: "",
    user: {}
  };

  getSpotifyToken = () => {
    const fragment = window.location.pathname;
    console.log(fragment);
    if (fragment) {
      const match = fragment.match(/access_token=(.*)[(^&)]/);
      const refreshMatch = fragment.match(/refresh_token=(.*)/);
      if (match) {
        const token = match[1].toString().slice(match[1] - 1);
        const refreshToken = refreshMatch[1]
          .toString()
          .slice(refreshMatch[1] - 1);
        console.log(token);
        this.setState(
          {
            token,
            refreshToken
          },
          this.getSpotifyData(token)
        );
      }
    }
  };

  getSpotifyData = token => {
    fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(response => response.json())
      .then(user => this.setState({ user }));
  };

  componentDidMount() {
    this.getSpotifyToken();
  }

  render() {
    return (
      <div>
        <a href="http://localhost:8888/login">
          <button>Log in with Spotify</button>
        </a>
        <p>{this.state.token}</p>
        <p>{this.state.refreshToken}</p>
      </div>
    );
  }
}

export default App;
