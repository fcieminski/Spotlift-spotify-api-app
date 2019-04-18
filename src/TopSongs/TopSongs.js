import React, { Component } from "react";
import { withAuth } from "../context/AuthContext";
import { IoIosMusicalNote } from "react-icons/io";
import { RecentlyPlayedBox } from "../styled";

class TopSongs extends Component {
  render() {
    const { topSongs } = this.props.authContext;
    return (
      <div>
        <h2 className="recently-played-info">
          <IoIosMusicalNote
            style={{ verticalAlign: "sub", marginRight: "5px" }}
          />
          Your top songs
        </h2>
        <div className="recently-played-container">
          {topSongs &&
            topSongs.map(item => (
              <a
                className="album-link"
                target="_blank"
                href={Object.values(item.album.external_urls)[0]}
              >
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
                        target="_blank"
                        href={Object.values(item.album.external_urls)[0]}
                      >
                        <IoIosMusicalNote style={{ verticalAlign: "sub" }} />
                        Album: {item.album.name}
                      </a>
                    </div>
                  </div>
                </RecentlyPlayedBox>
              </a>
            ))}
        </div>
      </div>
    );
  }
}

export default withAuth(TopSongs);
