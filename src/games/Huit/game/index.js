/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import { deck } from "../../../utils/cards";
import { TurnOrder, PlayerView } from "boardgame.io/core";
import { playable } from "../playable";

const DrawCard = (G, ctx, num) => {
  num = num || 1; //0 is false, so when G.action.pickup is set to 0, this actually picks 1 card
  //takes num cards from end of deck
  G.deck.length < num && Shuffle(G, ctx);

  const card = G.deck.splice(-num);
  G.players[ctx.playerID].hand = [...G.players[ctx.playerID].hand, ...card];
  updateHands(G, ctx.playerID);

  //Decrease player pickup
  G.players[ctx.playerID].pickup -= num;

  // If the player is not picking up cards from a special action or if the picked up card can be played:
  if (G.action.pickup > 0 || !playable(G, G.stack[0], card[0]))
    ctx.events.endTurn();

  // Reset pickup action
  G.action.pickup = 0;
};
const DrawHand = (G, ctx) => {
  //takes 8 cards from end of deck
  const card = G.deck.splice(-8);
  G.players[ctx.playerID].hand = [...G.players[ctx.playerID].hand, ...card];
  updateHands(G, ctx.playerID);
};
const PlayCard = (G, ctx, pos) => {
  //takes card at index pos and inserts it at the top of stack
  const card = G.players[ctx.playerID].hand.splice(pos, 1);
  G.stack.unshift(...card);
  updateHands(G, ctx.playerID);
  actionCard(G, ctx, ...card);
  G.action.sorte = "";

  // If the card playeed is not a sort-changing card
  const valuePlayed = card[0].slice(0, 1);

  if (valuePlayed !== "8" && valuePlayed !== "Y" && valuePlayed !== "X")
    ctx.events.endTurn();
};
const Skip = (G, ctx) => {
  // Skip your turn do nothing!
  ctx.events.endTurn();
  G.action.skip = false;
};

const ChangeSorte = (G, ctx, sorte) => {
  // Change the sorte and end turn
  G.action.sorte = sorte;
  G.action.change = false;
  ctx.events.endTurn();
};

const Reverse = (G, ctx) => {
  ctx.playOrder.reverse();
};

const Shuffle = (G, ctx) => {
  //takes all cards but top card in stack and shuffles them at the end of the deck
  if (G.stack.length > 1) {
    const cards = G.stack.splice(-(G.stack.length - 1));
    G.deck = [...ctx.random.Shuffle(cards), ...G.deck];
  }
};

const distributeCards = (G, ctx) => {
  let card;
  for (let i = 0; i < Object.entries(G.players).length; i++) {
    card = G.deck.splice(-8);
    G.players[i].hand = [...card];
    updateHands(G, i);
  }

  card = G.deck.splice(-1);
  G.stack.unshift(...card);
  actionCard(G, ctx, ...card);
};

const initPlayers = (ctx) => {
  let players = {};
  for (let i = 0; i < ctx.numPlayers; i++) {
    players[i] = {
      hand: [],
      pickup: 1,
    };
  }
  return players;
};

const initHands = (ctx) => {
  let hands = Array(ctx.numPlayers);
  for (let i = 0; i < ctx.numPlayers; i++) {
    hands[i] = 0;
  }
  return hands;
};

const updateHands = (G, playerID) => {
  G.hands[playerID] = G.players[playerID].hand.length;
};

const actionCard = (G, ctx, card) => {
  const _card = { valeur: card.slice(0, 1), sorte: card.slice(1, 3) };
  switch (_card.valeur) {
    case "8":
      G.action.change = true;
      break;
    case "0":
      G.action.reverse = !G.action.reverse;
      Reverse(G, ctx);
      break;
    case "J":
      G.action.skip = true;
      break;
    case "2":
      _card.sorte === "PI" ? (G.action.pickup += 4) : (G.action.pickup += 2);
      break;
    case "X":
      G.action.change = true;
      G.action.pickup += 5;
      break;
    case "Y":
      G.action.change = true;
      G.action.pickup += 5;
      break;

    default:
      break;
  }
};

export const Huit = {
  name: "le-huit",

  setup: (ctx) => ({
    deck: ctx.random.Shuffle(deck(Math.ceil(ctx.numPlayers / 3), true)),
    stack: [],
    players: initPlayers(ctx),
    hands: initHands(ctx),
    action: {
      reverse: false,
      skip: false,
      pickup: 0,
      sorte: "",
      change: false,
    },
  }),

  playerView: PlayerView.STRIP_SECRETS,

  moves: { DrawCard, DrawHand },

  turn: {
    order: TurnOrder.DEFAULT,
    onBegin: (G, ctx) => {
      G.players[ctx.currentPlayer].pickup = 1;
    },
  },
  phases: {
    play: {
      start: true,
      onBegin: (G, ctx) => {
        distributeCards(G);
      },
      moves: {
        PlayCard: {
          move: PlayCard,
          client: false,
        },
        Skip,
        DrawCard,
        Reverse: {
          move: ChangeSorte,
          client: false,
          noLimit: true,
        },
        ChangeSorte: {
          move: ChangeSorte,
          noLimit: true,
        },
        Shuffle: {
          move: Shuffle,
          noLimit: true,
        },
      },
    },
  },
};
