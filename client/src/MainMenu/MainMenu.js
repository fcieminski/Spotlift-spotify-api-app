import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { withAuth } from "../context/AuthContext";

class MainMenu extends Component {
  render() {
    return (
      <div className="side-menu-container">
        <ul>
          <li>
            <NavLink exact to="/">
              Home
            </NavLink>
          </li>
          {/* <li>
            <NavLink exact to="/playlist">
              Playlists
            </NavLink>
          </li> */}
        </ul>
        <ul className="playlists-ul-menu">
          <li>
            Playlists
            <ul className="nested-ul">
              {this.props.authContext.playlists &&
                this.props.authContext.playlists.map(playlist => (
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
