import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    data: null
  };

  getAccesToSpotify = () => {
    fetch("http://localhost:8888/login")
      .then(response => response.json())
      .then(data => console.log(data));
  };

  componentDidMount() {}

  render() {
    return (
      <div>
        <button onClick={this.getAccesToSpotify}> heleo</button>
      </div>
    );
  }
}

export default App;
