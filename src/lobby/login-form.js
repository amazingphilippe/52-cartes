/*
 * Copyright 2018 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/** @jsx jsx */
import { jsx, Button, Input, Label, Heading, Text } from "theme-ui";

import React from "react";
import PropTypes from "prop-types";
import Stack from "../components/Stack";

class LobbyLoginForm extends React.Component {
  static propTypes = {
    playerName: PropTypes.string,
    onEnter: PropTypes.func.isRequired,
  };
  static defaultProps = {
    playerName: "",
  };

  state = {
    playerName: this.props.playerName,
    nameErrorMsg: "",
  };

  render() {
    return (
      <Stack spacing={3} align="flex-start">
        <Heading variant="h2">Joueur</Heading>
        <Label>
          <p>Entrez un nom</p>
          <Text
            variant="errorMessage"
            sx={{
              display: !this.state.nameErrorMsg && "none",
              mb: 2,
              mt: -2,
            }}
          >
            {this.state.nameErrorMsg}
          </Text>
          <Input
            type="text"
            value={this.state.playerName}
            onChange={this.onChangePlayerName}
            onKeyPress={this.onKeyPress}
          />
        </Label>
        <Stack direction="column" align="flex-start" spacing={3}>
          <Button
            type="submit"
            variant="primary"
            sx={{
              flexShrink: 0,
            }}
            onClick={this.onClickEnter}
          >
            Appliquer
          </Button>
        </Stack>
      </Stack>
    );
  }

  onClickEnter = () => {
    if (this.state.playerName === "") return;
    this.props.onEnter(this.state.playerName);
  };

  onKeyPress = (event) => {
    if (event.key === "Enter") {
      this.onClickEnter();
    }
  };

  onChangePlayerName = (event) => {
    const name = event.target.value.trim();
    this.setState({
      playerName: name,
      nameErrorMsg: name.length > 0 ? "" : "Ça prend un nom!",
    });
  };
}

export default LobbyLoginForm;
