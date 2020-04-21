import { HuitName, Huit, HuitBoard } from "./Huit";

// Name should not contain space and capital letter
// https://github.com/nicolodavis/boardgame.io/issues/459

export const games = [HuitName];

export const gameConfig = {
  [HuitName]: {
    game: Huit,
    board: HuitBoard,
    maxPlayers: 10,
    minPlayers: 2,
  },
};
