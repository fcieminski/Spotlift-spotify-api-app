import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { withAuth } from "../context/AuthContext";

class MainMenu extends Component {
  render() {
    return (
      <>
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
        <ul>
          <li>
            Playlists
            <ul>
              {this.props.authContext.playlists &&
                this.props.authContext.playlists.map(playlist => (
                  <li>
                    <NavLink exact to={`/playlist/${playlist.id}`}>
                      {playlist.name}
                    </NavLink>
                  </li>
                ))}
            </ul>
          </li>
        </ul>
      </>
    );
  }
}

export default withAuth(MainMenu);
