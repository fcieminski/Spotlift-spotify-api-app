import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainScreen from "../MainScreen/MainScreen";
import RecentlyPlayed from "../RecentlyPlayed/RecentlyPlayed";
import Playlist from "../Playlist/Playlist";
import PlaylistScreen from "../PlaylistScreen/PlaylistScreen";
import { withAuth } from "../context/AuthContext";
import { StyledNav, StyledButton } from "../styled";
import MainMenu from "../MainMenu";

class Root extends Component {
  render() {
    return (
      <Router>
        {this.props.authContext.playlists ? (
          <>
            <Route path="/" component={MainScreen} />
            <Route path="/recently" component={RecentlyPlayed} />
            <Route exact path="/playlist" component={Playlist} />
            <Route
              exact
              path="/playlist:playlistId"
              component={PlaylistScreen}
            />
          </>
        ) : (
          <StyledNav>
            <a href="http://localhost:8888/login">
              <StyledButton> Log in with Spotify </StyledButton>
            </a>
          </StyledNav>
        )}
      </Router>
    );
  }
}

export default withAuth(Root);
