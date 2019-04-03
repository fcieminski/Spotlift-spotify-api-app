export const getSpotifyData = token => {
  fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token
    }
  })
    .then(response => response.json())
    .then(user => this.setState({ user: [user] }));
};
