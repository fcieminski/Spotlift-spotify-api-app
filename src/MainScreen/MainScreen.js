import React, { Component } from "react";
import RecentlyPlayed from "../RecentlyPlayed/RecentlyPlayed";
import Playlist from "../Playlist/Playlist";

class MainScreen extends Component {
  render() {
    return (
      <>
        <Playlist />
        <RecentlyPlayed />
      </>
    );
  }
}

export default MainScreen;
