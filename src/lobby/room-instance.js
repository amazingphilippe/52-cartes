/*
 * Copyright 2018 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from "react";
import PropTypes from "prop-types";
import Stack from "../components/Stack";
import { Heading, Text, Button, Box } from "theme-ui";
import { readableName } from "../utils/readableName";
import { FormattedPlural } from "react-intl";

class LobbyRoomInstance extends React.Component {
  static propTypes = {
    room: PropTypes.shape({
      gameName: PropTypes.string.isRequired,
      gameID: PropTypes.string.isRequired,
      players: PropTypes.array.isRequired,
    }),
    playerName: PropTypes.string.isRequired,
    onClickJoin: PropTypes.func.isRequired,
    onClickLeave: PropTypes.func.isRequired,
    onClickPlay: PropTypes.func.isRequired,
  };

  _createButtonJoin = (inst, seatId) => (
    <Button
      variant="primary"
      sx={{ mb: 3 }}
      key={"button-join-" + inst.gameID}
      onClick={() =>
        this.props.onClickJoin(inst.gameName, inst.gameID, "" + seatId)
      }
    >
      Rejoindre
    </Button>
  );

  _createButtonLeave = (inst) => (
    <Button
      variant="danger"
      sx={{ mb: 3 }}
      key={"button-leave-" + inst.gameID}
      onClick={() => this.props.onClickLeave(inst.gameName, inst.gameID)}
    >
      Quitter
    </Button>
  );

  _createButtonPlay = (inst, seatId) => (
    <Button
      variant="go"
      sx={{ mb: 3 }}
      key={"button-play-" + inst.gameID}
      onClick={() =>
        this.props.onClickPlay(inst.gameName, {
          gameID: inst.gameID,
          playerID: "" + seatId,
          numPlayers: inst.players.length,
        })
      }
    >
      Commencer
    </Button>
  );

  _createButtonSpectate = (inst) => (
    <Button
      variant="primary"
      sx={{ mb: 3 }}
      key={"button-spectate-" + inst.gameID}
      onClick={() =>
        this.props.onClickPlay(inst.gameName, {
          gameID: inst.gameID,
          numPlayers: inst.players.length,
        })
      }
    >
      Spectate
    </Button>
  );

  _createInstanceButtons = (inst) => {
    const playerSeat = inst.players.find(
      (player) => player.name === this.props.playerName
    );
    const freeSeat = inst.players.find((player) => !player.name);
    if (playerSeat && freeSeat) {
      // already seated: waiting for game to start
      return this._createButtonLeave(inst);
    }
    if (freeSeat) {
      // at least 1 seat is available
      return this._createButtonJoin(inst, freeSeat.id);
    }
    // room is full
    if (playerSeat) {
      return (
        <Stack direction="row" spacing={3}>
          {this._createButtonPlay(inst, playerSeat.id)}
          {this._createButtonLeave(inst)}
        </Stack>
      );
    }
    // room is full
    if (playerSeat) {
      return;
    }
    // allow spectating
    return this._createButtonSpectate(inst);
  };

  render() {
    const room = this.props.room;
    // let status = "Ouvert";
    // if (!room.players.find((player) => !player.name)) {
    //   status = "Partie en cours";
    // }
    return (
      <Stack
        id={`table-${room.gameID}`}
        sx={{ bg: "gray.100", p: 3 }}
        spacing={3}
      >
        <Heading>{room.gameID}</Heading>
        <Stack direction="row" spacing={3}>
          <Text
            sx={{
              fontSize: "text",
              fontWeight: 500,
              display: "block",
            }}
            as="span"
          >
            {readableName(room.gameName)}
          </Text>
          <Text
            sx={{ fontSize: "text", fontWeight: 500, display: "block" }}
            as="span"
          >
            <FormattedPlural
              value={room.players.length}
              one={`${room.players.length} joueur`}
              other={`${room.players.length} joueurs`}
            />
          </Text>
        </Stack>
        <Stack direction="row" spacing={3}>
          <Stack direction="row" spacing={3} sx={{ flexWrap: "wrap", mb: -3 }}>
            {room.players.map((player, key) => {
              return player.name ? (
                <Text
                  key={key}
                  variant="button"
                  sx={{
                    bg: "white",
                    mb: 3,
                    "&:active": {
                      boxShadow: "none",
                    },
                    ...(this.props.playerName === player.name && {
                      boxShadow: (theme) => theme.shadows.you,
                    }),
                  }}
                >
                  {player.name}
                </Text>
              ) : (
                <Box
                  key={key}
                  sx={{ height: "40px", width: "40px", bg: "gray.200", mb: 3 }}
                ></Box>
              );
            })}
            {this._createInstanceButtons(room)}
          </Stack>
        </Stack>
      </Stack>
    );
  }
}

export default LobbyRoomInstance;
