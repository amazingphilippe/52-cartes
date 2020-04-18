import React from "react";
import { Client } from "boardgame.io/react";
import { Huit } from "./games/huit/game";
import { HuitBoard } from "./games/huit/board";
import { SocketIO } from "boardgame.io/multiplayer";
import { Lobby } from "boardgame.io/react";

const HuitClient = Client({
  game: Huit,
  board: HuitBoard,
  multiplayer: SocketIO({
    server: `${window.location.protocol}//${window.location.hostname}:8000`,
  }),
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
    return (
      <>
        <Lobby
          gameServer={`${window.location.protocol}//${window.location.hostname}:8000`}
          lobbyServer={`${window.location.protocol}//${window.location.hostname}:8000`}
          gameComponents={[{ game: Huit, board: HuitBoard }]}
        />
        <HuitClient playerID={this.state.playerID} />
      </>
    );
  }
}

export default App;
