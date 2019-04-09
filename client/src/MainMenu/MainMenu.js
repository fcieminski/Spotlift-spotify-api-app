import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class MainMenu extends Component {
  render() {
    return (
      <ul>
        <li>
          <NavLink exact to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/playlist">
            Playlists
          </NavLink>
        </li>
      </ul>
    );
  }
}

export default MainMenu;
