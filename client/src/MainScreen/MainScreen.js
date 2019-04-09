import React, { Component } from "react";
import RecentlyPlayed from "../RecentlyPlayed/RecentlyPlayed";
import Playlist from "../Playlist/Playlist";
import { NavLink } from "react-router-dom";
import { Layout, GridSection, GridMain, GridNav } from "../styled.js";
import MainMenu from "../MainMenu";

class MainScreen extends Component {
  render() {
    return (
      <Layout>
        <GridNav style={{ border: "5px solid green" }}>
          <MainMenu />
        </GridNav>
        <GridMain>
          <Playlist />
          <RecentlyPlayed />
        </GridMain>
        <GridSection style={{ border: "5px solid orange" }}>
          <div>
            <h1>Hello</h1>
          </div>
        </GridSection>
      </Layout>
    );
  }
}

export default MainScreen;
