/** @jsx jsx */
import React from "react";
import PropTypes from "prop-types";
import { jsx, Text, Button, Container, Box } from "theme-ui";
import { Card } from "../../../../components/Card";
import Stack from "../../../../components/Stack";
import { NameTag } from "../../../../components/NameTag";
import { playable } from "../../playable";

export class HuitBoard extends React.Component {
  static propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    moves: PropTypes.any.isRequired,
    events: PropTypes.any.isRequired,
    isActive: PropTypes.bool,
    isMultiplayer: PropTypes.bool,
  };

  clickDeck = (num) => {
    this.props.isActive &&
      !this.props.G.action.skip &&
      this.props.G.players[this.props.playerID].pickup > 0 &&
      this.props.moves.DrawCard(num);
  };
  changeSorte = (sorte) => {
    this.props.isActive &&
      this.props.G.action.change &&
      this.props.moves.ChangeSorte(sorte);
  };

  playCard = (index) => {
    const a = this.props.G.stack[0];
    const b = this.props.G.players[this.props.playerID].hand[index];
    const action = { valeur: b.slice(0, 1), sorte: b.slice(1, 3) };
    if (playable(this.props.G, a, b) && this.props.isActive) {
      this.props.moves.PlayCard(index, action);
    }
  };

  skip = () => {
    this.props.isActive && this.props.moves.Skip();
  };

  render() {
    const hand = this.props.G.players[this.props.playerID].hand;
    const deckDepth = Math.floor(this.props.G.deck.length / 5);
    const stackDepth = Math.floor(this.props.G.stack.length / 5);

    return (
      <Container>
        <Box
          p={3}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Stack spacing={3} direction="row">
            <Card
              styles={{
                width: "90px",
                boxShadow: (theme) => {
                  let shadow = "";
                  for (let i = 0; i < deckDepth; i++) {
                    shadow += `${i * 2}px ${i * 2}px 0 0 ${
                      i % 2 === 0 ? theme.colors.gray[300] : "white"
                    },`;
                  }
                  return shadow.slice(0, -1);
                },
              }}
            >
              <Button
                onClick={() => this.clickDeck(this.props.G.action.pickup)}
                variant="card"
              >
                Pige
              </Button>
            </Card>
            {this.props.G.action.sorte !== "" && (
              <Text>Sorte demandée: {this.props.G.action.sorte}</Text>
            )}
            {this.props.G.action.pickup !== 0 && (
              <Text>+{this.props.G.action.pickup}</Text>
            )}
          </Stack>
          <Card
            styles={{
              width: "90px",
              boxShadow: (theme) => {
                let shadow = "";
                for (let i = 0; i < stackDepth; i++) {
                  shadow += `${i * 2}px ${i * 2}px 0 0 ${
                    i % 2 === 0 ? theme.colors.gray[300] : "white"
                  },`;
                }
                return shadow.slice(0, -1);
              },
            }}
          >
            <Button variant="cardValue">{this.props.G.stack[0]}</Button>
          </Card>
          <Stack as="ol" spacing={2}>
            {this.props.gameMetadata.map(
              (key) =>
                key["id"].toString() !== this.props.playerID && (
                  <NameTag key={key} {...this.props} player={key} />
                )
            )}
          </Stack>
        </Box>

        <Stack p={3} spacing={3}>
          <Container sx={{ display: "flex" }}>
            <NameTag
              {...this.props}
              player={this.props.gameMetadata[this.props.playerID]}
            >
              {" "}
              (Vous)
            </NameTag>
            {this.props.G.action.skip && this.props.isActive && (
              <Button variant="primary" onClick={() => this.skip()}>
                Passe ton tour!
              </Button>
            )}
            {this.props.G.action.change && this.props.isActive && (
              <Stack spacing={3} direction="row">
                <Button onClick={() => this.changeSorte("PI")}>PI</Button>
                <Button onClick={() => this.changeSorte("CE")}>CE</Button>
                <Button onClick={() => this.changeSorte("CA")}>CA</Button>
                <Button onClick={() => this.changeSorte("TR")}>TR</Button>
              </Stack>
            )}
          </Container>

          <Container sx={{ display: "flex" }}>
            {hand.map((key, i) => (
              <Card
                className="card"
                key={key}
                styles={{
                  width: "90px",
                  transition: "0.2s",
                  flex: "0 1 auto",
                  "&:not(:first-child)": {
                    ml: -3,
                  },
                  "&:hover": {
                    transform: "translateY(-16px)",
                    zIndex: "99",
                    boxShadow: (theme) => theme.shadows.elevate,
                  },
                  ":hover ~ .card": {
                    transform: "translateX(14px)",
                  },
                }}
              >
                <Button
                  variant="cardValue"
                  onClick={() => this.playCard(i)}
                  sx={{
                    display: "flex",
                  }}
                >
                  {key}
                </Button>
              </Card>
            ))}
          </Container>
        </Stack>
      </Container>
    );
  }
}
