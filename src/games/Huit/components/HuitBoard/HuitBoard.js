/** @jsx jsx */
import React from "react";
import PropTypes from "prop-types";
import { jsx, Text, Button, Container, Box } from "theme-ui";
import { Card, CardFace, Sorte } from "../../../../components/Card";
import Stack from "../../../../components/Stack";
import { NameTag } from "../../../../components/NameTag";
import { playable } from "../../playable";
import { ReactComponent as CA } from "../../../../images/CA.svg";
import { ReactComponent as CE } from "../../../../images/CE.svg";
import { ReactComponent as TR } from "../../../../images/TR.svg";
import { ReactComponent as PI } from "../../../../images/PI.svg";

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
      <Container sx={{ display: "flex", flexWrap: ["wrap", "nowrap"] }}>
        <Stack p={3} spacing={3} sx={{ flexGrow: "1" }}>
          <Stack spacing={3} direction="row">
            <Card
              styles={{
                width: "90px",
                boxShadow: (theme) => {
                  let shadow = "";
                  for (let i = 0; i < deckDepth; i++) {
                    shadow += `${i * 2}px ${i * 2}px 0 0 ${
                      i % 2 === 0
                        ? theme.colors.gray[400]
                        : theme.colors.gray[200]
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
            <Card
              styles={{
                width: "90px",
                boxShadow: (theme) => {
                  let shadow = "";
                  for (let i = 0; i < stackDepth; i++) {
                    shadow += `${i * 2}px ${i * 2}px 0 0 ${
                      i % 2 === 0
                        ? theme.colors.gray[200]
                        : theme.colors.gray[400]
                    },`;
                  }
                  return shadow.slice(0, -1);
                },
              }}
            >
              <Button variant="cardValue">
                <CardFace a={this.props.G.stack[0]} />
              </Button>
            </Card>
            {this.props.G.action.sorte !== "" && (
              <Text
                variant="button"
                sx={{
                  bg: "gray.100",
                  fontSize: "21px",
                }}
              >
                Demandé&thinsp;: <Sorte sorte={this.props.G.action.sorte} />
              </Text>
            )}
            {this.props.G.action.pickup !== 0 && (
              <Text sx={{ fontSize: "21px" }}>
                +{this.props.G.action.pickup}
              </Text>
            )}
          </Stack>

          <Stack direction="row" sx={{ alignItems: "stretch" }}>
            <NameTag
              {...this.props}
              player={this.props.gameMetadata[this.props.playerID]}
              direction="row-reverse"
            >
              {" "}
              (Vous)
            </NameTag>
            {this.props.G.action.skip && this.props.isActive && (
              <Button variant="action" onClick={() => this.skip()}>
                Passe ton tour!
              </Button>
            )}
            {this.props.G.action.change && this.props.isActive && (
              <Stack spacing={3} direction="row">
                <Button variant="change" onClick={() => this.changeSorte("PI")}>
                  <PI />
                </Button>
                <Button variant="change" onClick={() => this.changeSorte("CE")}>
                  <CE />
                </Button>
                <Button variant="change" onClick={() => this.changeSorte("CA")}>
                  <CA />
                </Button>
                <Button variant="change" onClick={() => this.changeSorte("TR")}>
                  <TR />
                </Button>
              </Stack>
            )}
          </Stack>

          <Container sx={{ display: "flex", flexWrap: ["wrap", "nowrap"] }}>
            {hand.map((key, i) => (
              <Card
                className="card"
                key={key}
                styles={{
                  width: "90px",
                  transition: "0.2s",
                  flex: "0 1 auto",
                  mr: [3, 0],
                  mb: [3, 0],
                  "&:not(:first-child)": {
                    ml: [0, -3],
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
                  <CardFace a={key} />
                </Button>
              </Card>
            ))}
          </Container>
        </Stack>

        <Box
          p={3}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Stack
            spacing={3}
            sx={{
              flexDirection: ["row", "column"],
              flexWrap: ["wrap", "nowrap"],
            }}
          >
            {this.props.gameMetadata.map((key) => (
              <Box>
                <NameTag
                  key={key}
                  {...this.props}
                  player={key}
                  sx={{ mr: [3, 0] }}
                />
              </Box>
            ))}
          </Stack>
        </Box>

        <Text as="pre" sx={{ display: "none" }}>
          CTX: {JSON.stringify(this.props.ctx)}
        </Text>
        <Text as="pre" sx={{ display: "none" }}>
          G: {JSON.stringify(this.props.G)}
        </Text>
      </Container>
    );
  }
}
