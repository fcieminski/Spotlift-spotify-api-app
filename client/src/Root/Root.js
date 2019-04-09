import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

class Root extends Component {
  render() {
    return (
      <Router>
        <Route path="/" component={MainScreen} />
        <Route path="/recently" component={RecentlyPlayed} />
        <Route exact path="/playlist" component={Playlist} />
        <Route exact path="/playlist:playlistId" component={PlaylistScreen} />
      </Router>
    );
  }
}

export default Root;
