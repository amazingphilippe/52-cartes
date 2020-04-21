// src/server.js
import { Server } from "boardgame.io/server";
import { Huit } from "./games/Huit/game";
import randomWord from "random-words";

const server = Server({ games: [Huit] });

const port = process.env.PORT || 8000;
const lobbyConfig = {
  uuid: () => {
    return `${randomWord()}-${randomWord()}`; //broken for some reason...
  },
};

server.run(port, () => console.log("server running on %c", port), lobbyConfig);
