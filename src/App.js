import React from "react";
import { Client, Lobby } from "boardgame.io/react";
import { TicTacToe } from "./game";
import { TicTacToeBoard } from "./board";
import { Local } from "boardgame.io/multiplayer";
import { SocketIO } from "boardgame.io/multiplayer";

const TicTacToeClient = Client({
  game: TicTacToe,
  board: TicTacToeBoard,
  multiplayer: SocketIO({ server: "https://vast-dusk-91608.herokuapp.com/" }),
});

class App extends React.Component {
  state = { playerID: null };

  render() {
    if (this.state.playerID === null) {
      return (
        <div>
          <p>Play as</p>
          <button onClick={() => this.setState({ playerID: "0" })}>
            Player 0
          </button>
          <button onClick={() => this.setState({ playerID: "1" })}>
            Player 1
          </button>
        </div>
      );
    }
    return (
      <div>
        <TicTacToeClient playerID={this.state.playerID} />
      </div>
    );
  }
}

export default App;
