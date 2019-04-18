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
import SpotifyLogoGreen from "../img/Spotify_Logo_RGB_Green.png";
import SpotifyLogoWhite from "../img/Spotify_Logo_RGB_White.png";
import { IoIosHeart } from "react-icons/io";

import MainMenu from "../MainMenu";
import TopSongs from "../TopSongs/TopSongs";

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
                <Route exact path="/topsongs" component={TopSongs} />
              </>
            ) : (
              <StyledNav>
                <a href="https://netlify-backend.herokuapp.com/login">
                  <StyledButton>
                    {" "}
                    Log in with{" "}
                    <img
                      style={{
                        width: "170px",
                        verticalAlign: "middle",
                        marginLeft: "10px"
                      }}
                      src={SpotifyLogoGreen}
                    />{" "}
                  </StyledButton>
                </a>
              </StyledNav>
            )}
          </GridMain>
          <GridSection>
            <h2 className="footer-info">
              Made with{" "}
              <IoIosHeart
                style={{
                  verticalAlign: "middle",
                  marginLeft: "10px",
                  marginRight: "10px"
                }}
              />{" "}
              using <img src={SpotifyLogoWhite} /> API
            </h2>
          </GridSection>
        </Router>
      </Layout>
    );
  }
}

export default withAuth(Root);
