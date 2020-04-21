import React from "react";
import { Client } from "boardgame.io/react";
import { Huit, HuitBoard } from "./games/Huit";
import { SocketIO } from "boardgame.io/multiplayer";
import Lobby from "./lobby/react";
import { ThemeProvider } from "theme-ui";
import theme from "./theme";
import WebFont from "webfontloader";

WebFont.load({
  custom: {
    families: ["Radnika"],
    urls: ["typical/radnika/ical.css"],
  },
});

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
      <ThemeProvider theme={theme}>
        <Lobby
          gameServer={`${window.location.protocol}//${window.location.hostname}:8000`}
          lobbyServer={`${window.location.protocol}//${window.location.hostname}:8000`}
          gameComponents={[{ game: Huit, board: HuitBoard }]}
        />
        <HuitClient playerID={this.state.playerID} />
      </ThemeProvider>
    );
  }
}

export default App;
