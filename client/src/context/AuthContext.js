import React, { Component } from "react";
const AuthContext = React.createContext({ playlists: null });
const { Provider, Consumer } = AuthContext;

export default class AuthContextProvider extends Component {
  state = {
    token: "",
    playlists: null,
    recentlyPlayed: null,
    withoutDuplicates: () => {
      return (
        this.state.recentlyPlayed &&
        this.state.recentlyPlayed.filter(
          (element, index, self) =>
            self.map(item => item.track.name).indexOf(element.track.name) ===
            index
        )
      );
    },
    topSongs: null,
    error: null
  };

  getSpotifyToken = () => {
    const fragment = window.location.search;
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
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Błąd!");
        }
      })
      .then(data =>
        this.setState({
          recentlyPlayed: data.items
        })
      )
      .catch(error =>
        this.setState({
          error: error.message
        })
      );
    fetch("https://api.spotify.com/v1/me/playlists", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Błąd!");
        }
      })
      .then(data =>
        this.setState({
          playlists: data.items
        })
      )
      .catch(error =>
        this.setState({
          error: error.message
        })
      );
    fetch("https://api.spotify.com/v1/me/top/tracks", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Błąd!");
        }
      })
      .then(data =>
        this.setState({
          topSongs: data.items.sort((a, b) => a.popularity < b.popularity)
        })
      )
      .catch(error =>
        this.setState({
          error: error.message
        })
      );
  };

  componentDidMount() {
    this.getSpotifyToken();
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

export const withAuth = Component => props => {
  return (
    <Consumer>{value => <Component {...props} authContext={value} />}</Consumer>
  );
};
