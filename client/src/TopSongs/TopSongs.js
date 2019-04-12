import React, { Component } from "react";
import { withAuth } from "../context/AuthContext";
import { IoIosMusicalNote } from "react-icons/io";
import { RecentlyPlayedBox } from "../styled";

class TopSongs extends Component {
  shareMessenger = () => {
    const link = "https://open.spotify.com/album/34OgX0UTWfVQtXHIntUsLT";
    const app_id = "314035112596219";
    window.open(
      "fb-messenger://share?link=" +
        encodeURIComponent(link) +
        "&app_id=" +
        encodeURIComponent(app_id)
    );
  };

  render() {
    return (
      <div>
        <h2 className="recently-played-info">
          <IoIosMusicalNote
            style={{ verticalAlign: "sub", marginRight: "5px" }}
          />
          Your top songs
        </h2>
        <div className="recently-played-container">
          {this.props.authContext.topSongs &&
            this.props.authContext.topSongs.map(item => (
              <RecentlyPlayedBox>
                <img
                  className="recently-played-img"
                  src={item.album.images[1].url}
                />
                <div className="recently-played-about">
                  <div>
                    <h2>
                      {item.album.artists.map(artist => `${artist.name}`)}:{" "}
                      {item.name}
                    </h2>
                    <a
                      className="album-link"
                      href={Object.values(item.album.external_urls)[0]}
                    >
                      <IoIosMusicalNote style={{ verticalAlign: "sub" }} />
                      Album: {item.album.name}
                    </a>
                  </div>
                </div>
              </RecentlyPlayedBox>
            ))}
        </div>
      </div>
    );
  }
}

export default withAuth(TopSongs);
