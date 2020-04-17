import React from "react";
import { Client } from "boardgame.io/react";
import { Huit } from "./games/huit/game";
import { HuitBoard } from "./games/huit/board";
import { SocketIO } from "boardgame.io/multiplayer";

const HuitClient = Client({
  game: Huit,
  board: HuitBoard,
  multiplayer: SocketIO({ server: "http://localhost:8000" }),
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { playerID: null, in: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ playerID: event.target.value });
  }

  handleSubmit(event) {
    this.setState({ in: true });
    event.preventDefault();
  }

  render() {
    return this.state.in ? (
      <HuitClient playerID={this.state.playerID} />
    ) : (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Inventez un pseudonyme
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Jouer" />
        </form>
      </div>
    );
  }
}

export default App;
