import React from "react";
import PropTypes from "prop-types";
import { Flex } from "theme-ui";

export class NameTag extends React.Component {
  static propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    player: PropTypes.any.isRequired,
  };
  render() {
    return (
      <Flex
        as="li"
        sx={{
          p: 2,
          pr: 3,
          bg: "gray.100",
          alignItems: "baseline",
          alignSelf: "flex-end",
          borderRadius: "full",
          ...(parseInt(this.props.ctx.currentPlayer, 10) ===
            this.props.player["id"] && {
            boxShadow: (theme) => theme.shadows.you,
          }),
        }}
      >
        <Flex
          sx={{
            borderRadius: "full",
            p: 2,
            bg: "gray.200",
            mr: 2,
            justifyContent: "center",
            width: "35px",
            height: "35px",
          }}
        >
          {this.props.G.hands[this.props.player["id"]]}
        </Flex>
        {this.props.player["name"]}
        {this.props.children}
      </Flex>
    );
  }
}
