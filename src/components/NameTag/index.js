import React from "react";
import PropTypes from "prop-types";
import { Flex } from "theme-ui";
import Stack from "../Stack";

export class NameTag extends React.Component {
  static propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    player: PropTypes.any.isRequired,
  };

  render() {
    //{this.props.G.action.skip && this.props.isActive && (
    //this.props.G.hands[this.props.player["id"]] === 1
    return (
      <Stack
        direction="row"
        sx={{
          alignItems: "stretch",
          justifyContent: "flex-end",
          ...this.props.sx,
        }}
        {...this.props}
      >
        <Flex
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
              bg: "blue.700",
              fontWeight: "negative",
              color: "white",
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
              ...(parseInt(this.props.ctx.currentPlayer, 10) ===
                this.props.player["id"] && {
                bg: "blue.200",
                color: "text",
              }),
            }}
          >
            {this.props.G.hands[this.props.player["id"]]}
          </Flex>
          {this.props.player["name"]}
          {this.props.children}
        </Flex>
      </Stack>
    );
  }
}
