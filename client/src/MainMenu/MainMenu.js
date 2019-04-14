import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { withAuth } from "../context/AuthContext";
import { IoIosMenu } from "react-icons/io";

class MainMenu extends Component {
  handleClick(event) {
    event.stopPropagation();
    let iconMenu = document.querySelector("#menu-icon");
    let menuMobile = document.querySelector(".menu");
    if (event.target === iconMenu) {
      menuMobile.classList.contains("menu_mobile")
        ? menuMobile.classList.remove("menu_mobile")
        : menuMobile.classList.add("menu_mobile");
    }
  }
  toggleMenu = event => {
    event.stopPropagation();
    let menuMobile = document.querySelector(".menu");
    menuMobile.classList.remove("menu_mobile");
  };

  componentDidMount() {
    window.addEventListener("click", this.toggleMenu);
  }

  render() {
    const { playlists } = this.props.authContext;
    return (
      <div className="side-menu-container">
        <IoIosMenu
          onClick={this.handleClick}
          id="menu-icon"
          className="mobile-menu-icon"
        />
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
