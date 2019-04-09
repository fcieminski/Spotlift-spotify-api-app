import React, { Component } from "react";
import RecentlyPlayed from "../RecentlyPlayed/RecentlyPlayed";
import Playlist from "../Playlist/Playlist";
import { Layout, GridSection, GridMain, GridNav } from "../styled.js";

class MainScreen extends Component {
  render() {
    return (
      <Layout>
        <GridNav style={{ border: "5px solid green" }}>
          <div>
            <h1>Hello</h1>
          </div>
        </GridNav>
        <GridMain style={{ border: "5px solid white" }}>
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
