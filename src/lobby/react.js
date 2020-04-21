/*
 * Copyright 2018 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from "react";
import Cookies from "react-cookies";
import PropTypes from "prop-types";
import { Client } from "boardgame.io/react";
import { MCTSBot } from "boardgame.io/ai";
import { SocketIO, Local } from "boardgame.io/multiplayer";
import { LobbyConnection } from "./connection";
import LobbyLoginForm from "./login-form";
import LobbyRoomInstance from "./room-instance";
import LobbyCreateRoomForm from "./create-room-form";
import { jsx, Container, Flex, Box, Grid, Heading, Button } from "theme-ui";
import Stack from "../components/Stack";

const LobbyPhases = {
  ENTER: "enter",
  PLAY: "play",
  LIST: "list",
};

/**
 * Lobby
 *
 * React lobby component.
 *
 * @param {Array}  gameComponents - An array of Board and Game objects for the supported games.
 * @param {string} lobbyServer - Address of the lobby server (for example 'localhost:8000').
 *                               If not set, defaults to the server that served the page.
 * @param {string} gameServer - Address of the game server (for example 'localhost:8001').
 *                              If not set, defaults to the server that served the page.
 * @param {function} clientFactory - Function that is used to create the game clients.
 * @param {number} refreshInterval - Interval between server updates (default: 2000ms).
 * @param {bool}   debug - Enable debug information (default: false).
 *
 * Returns:
 *   A React component that provides a UI to create, list, join, leave, play or spectate game instances.
 */
class Lobby extends React.Component {
  static propTypes = {
    gameComponents: PropTypes.array.isRequired,
    lobbyServer: PropTypes.string,
    gameServer: PropTypes.string,
    debug: PropTypes.bool,
    clientFactory: PropTypes.func,
    refreshInterval: PropTypes.number,
  };

  static defaultProps = {
    debug: false,
    clientFactory: Client,
    refreshInterval: 2000,
  };

  state = {
    phase: LobbyPhases.ENTER,
    playerName: "Visitor",
    runningGame: null,
    errorMsg: "",
    credentialStore: {},
  };

  constructor(props) {
    super(props);
    this._createConnection(this.props);
    setInterval(this._updateConnection, this.props.refreshInterval);
  }

  componentDidMount() {
    let cookie = Cookies.load("lobbyState") || {};
    if (cookie.phase && cookie.phase === LobbyPhases.PLAY) {
      cookie.phase = LobbyPhases.LIST;
    }
    this.setState({
      phase: cookie.phase || LobbyPhases.ENTER,
      playerName: cookie.playerName || "Visitor",
      credentialStore: cookie.credentialStore || {},
    });
  }

  componentDidUpdate(prevProps, prevState) {
    let name = this.state.playerName;
    let creds = this.state.credentialStore[name];
    if (
      prevState.phase !== this.state.phase ||
      prevState.credentialStore[name] !== creds ||
      prevState.playerName !== name
    ) {
      this._createConnection(this.props);
      this._updateConnection();
      let cookie = {
        phase: this.state.phase,
        playerName: name,
        credentialStore: this.state.credentialStore,
      };
      Cookies.save("lobbyState", cookie, { path: "/" });
    }
  }

  _createConnection = (props) => {
    const name = this.state.playerName;
    this.connection = LobbyConnection({
      server: props.lobbyServer,
      gameComponents: props.gameComponents,
      playerName: name,
      playerCredentials: this.state.credentialStore[name],
    });
  };

  _updateCredentials = (playerName, credentials) => {
    this.setState((prevState) => {
      // clone store or componentDidUpdate will not be triggered
      const store = Object.assign({}, prevState.credentialStore);
      store[[playerName]] = credentials;
      return { credentialStore: store };
    });
  };

  _updateConnection = async () => {
    await this.connection.refresh();
    this.forceUpdate();
  };

  _enterLobby = (playerName) => {
    this.setState({ playerName, phase: LobbyPhases.LIST });
  };

  _exitLobby = async () => {
    await this.connection.disconnect();
    this.setState({ phase: LobbyPhases.ENTER, errorMsg: "" });
  };

  _createRoom = async (gameName, numPlayers) => {
    try {
      await this.connection.create(gameName, numPlayers);
      await this.connection.refresh();
      // rerender
      this.setState({});
    } catch (error) {
      this.setState({ errorMsg: error.message });
    }
  };

  _joinRoom = async (gameName, gameID, playerID) => {
    try {
      await this.connection.join(gameName, gameID, playerID);
      await this.connection.refresh();
      this._updateCredentials(
        this.connection.playerName,
        this.connection.playerCredentials
      );
    } catch (error) {
      this.setState({ errorMsg: error.message });
    }
  };

  _leaveRoom = async (gameName, gameID) => {
    try {
      await this.connection.leave(gameName, gameID);
      await this.connection.refresh();
      this._updateCredentials(
        this.connection.playerName,
        this.connection.playerCredentials
      );
    } catch (error) {
      this.setState({ errorMsg: error.message });
    }
  };

  _startGame = (gameName, gameOpts) => {
    const gameCode = this.connection._getGameComponents(gameName);
    if (!gameCode) {
      this.setState({
        errorMsg: "game " + gameName + " not supported",
      });
      return;
    }

    let multiplayer = undefined;
    if (gameOpts.numPlayers > 1) {
      if (this.props.gameServer) {
        multiplayer = SocketIO({ server: this.props.gameServer });
      } else {
        multiplayer = SocketIO();
      }
    }

    if (gameOpts.numPlayers == 1) {
      const maxPlayers = gameCode.game.maxPlayers;
      let bots = {};
      for (let i = 1; i < maxPlayers; i++) {
        bots[i + ""] = MCTSBot;
      }
      multiplayer = Local({ bots });
    }

    const app = this.props.clientFactory({
      game: gameCode.game,
      board: gameCode.board,
      debug: this.props.debug,
      multiplayer,
    });

    const game = {
      app: app,
      gameID: gameOpts.gameID,
      playerID: gameOpts.numPlayers > 1 ? gameOpts.playerID : "0",
      credentials: this.connection.playerCredentials,
    };

    this.setState({ phase: LobbyPhases.PLAY, runningGame: game });
  };

  _exitRoom = () => {
    this.setState({ phase: LobbyPhases.LIST, runningGame: null });
  };

  _getPhaseVisibility = (phase) => {
    return this.state.phase !== phase ? "hidden" : "phase";
  };

  renderRooms = (rooms, playerName) => {
    return rooms.map((room) => {
      const { gameID, gameName, players } = room;
      return (
        <Box>
          <LobbyRoomInstance
            key={"instance-" + gameID}
            room={{ gameID, gameName, players: Object.values(players) }}
            playerName={playerName}
            onClickJoin={this._joinRoom}
            onClickLeave={this._leaveRoom}
            onClickPlay={this._startGame}
          />
        </Box>
      );
    });
  };

  render() {
    const { gameComponents, renderer } = this.props;
    const { errorMsg, playerName, phase, runningGame } = this.state;

    if (renderer) {
      return renderer({
        errorMsg,
        gameComponents,
        rooms: this.connection.rooms,
        phase,
        playerName,
        runningGame,
        handleEnterLobby: this._enterLobby,
        handleExitLobby: this._exitLobby,
        handleCreateRoom: this._createRoom,
        handleJoinRoom: this._joinRoom,
        handleLeaveRoom: this._leaveRoom,
        handleExitRoom: this._exitRoom,
        handleRefreshRooms: this._updateConnection,
        handleStartGame: this._startGame,
      });
    }

    return (
      <Grid gap={3} columns={[10]} sx={{ p: 3 }}>
        <Heading as="h1" variant="h1" sx={{ gridColumn: "span 10" }}>
          Lobby
        </Heading>
        <Stack
          spacing={3}
          sx={{ gridColumn: ["1 / span 10", "1 / span 4", "1 / span 3"] }}
        >
          <Box className={this._getPhaseVisibility(LobbyPhases.ENTER)}>
            <LobbyLoginForm
              key={playerName}
              playerName={playerName}
              onEnter={this._enterLobby}
            />
          </Box>

          <Box className={this._getPhaseVisibility(LobbyPhases.LIST)}>
            <div>
              <LobbyCreateRoomForm
                games={gameComponents}
                createGame={this._createRoom}
              />
            </div>
          </Box>
        </Stack>
        <Stack
          className={this._getPhaseVisibility(LobbyPhases.LIST)}
          sx={{ gridColumn: ["1 / span 10", "5 / span 6", "4 / span 7"] }}
        >
          <Heading variant="h2" className="phase-title">
            Tables
          </Heading>
          <Stack spacing={3} id="instances">
            {this.renderRooms(this.connection.rooms, playerName)}
            <span className="error-msg">{errorMsg}</span>
          </Stack>
        </Stack>
        {runningGame && (
          <Stack
            sx={{ gridColumn: "span 10" }}
            className={this._getPhaseVisibility(LobbyPhases.PLAY)}
          >
            <runningGame.app
              gameID={runningGame.gameID}
              playerID={runningGame.playerID}
              credentials={runningGame.credentials}
            />
            <Button variant="danger" onClick={this._exitRoom}>
              Quitter la partie
            </Button>
          </Stack>
        )}

        <Box sx={{ gridColumn: "span 10" }} className="buttons" id="lobby-exit">
          <Button variant="danger" onClick={this._exitLobby}>
            Quitter le lobby
          </Button>
        </Box>
      </Grid>
    );
  }
}

export default Lobby;
