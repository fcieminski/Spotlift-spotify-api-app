import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { withAuth } from "../context/AuthContext";

class MainMenu extends Component {
  render() {
    const { playlists } = this.props.authContext;
    return (
      <div className="side-menu-container">
        <ul className="menu">
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
          <li>
            <NavLink exact to="/recently">
              Recently played
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/topsongs">
              Top songs
            </NavLink>
          </li>
        </ul>
        <ul className="playlists-ul-menu">
          <li>
            Playlists
            <ul className="nested-ul">
              {playlists &&
                playlists.map(playlist => (
                  <li>
                    <Link exact to={`/playlist/${playlist.id}`}>
                      {playlist.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </li>
        </ul>
      </div>
    );
  }
}

export default withAuth(MainMenu);
