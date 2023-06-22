import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: "lisbon",
    };
  }

  render() {
    return (
      <div className="app">
        <h1>Classy Weather</h1>

        <input
          type="text"
          placeholder="Search for location..."
          value={this.state.location}
          onChange={(e) => this.setState({ location: e.target.value })}
        />

        <button>Get weather</button>
      </div>
    );
  }
}

export default App;
