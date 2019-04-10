import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainScreen from "../MainScreen/MainScreen";
import RecentlyPlayed from "../RecentlyPlayed/RecentlyPlayed";
import Playlist from "../Playlist/Playlist";
import PlaylistScreen from "../PlaylistScreen/PlaylistScreen";
import { withAuth } from "../context/AuthContext";
import {
  StyledNav,
  StyledButton,
  Layout,
  GridSection,
  GridMain,
  GridNav
} from "../styled";

import MainMenu from "../MainMenu";

class Root extends Component {
  render() {
    return (
      <Layout>
        <Router>
          <GridNav>
            <MainMenu />
          </GridNav>
          <GridMain>
            {this.props.authContext.playlists ? (
              <>
                <Route exact path="/" component={MainScreen} />
                <Route exact path="/recently" component={RecentlyPlayed} />
                <Route exact path="/playlist" component={Playlist} />
                <Route
                  exact
                  path="/playlist/:playlistId"
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
          </GridMain>
          <GridSection style={{ border: "5px solid orange" }}>
            <div>
              <h1>Hello</h1>
            </div>
          </GridSection>
        </Router>
      </Layout>
    );
  }
}

export default withAuth(Root);
