// src/server.js
const Server = require("boardgame.io/server").Server;
const TicTacToe = require("./game").TicTacToe;
const server = Server({ games: [TicTacToe] });

const port = process.env.PORT || 8000;
server.run(port, () => console.log("server running on %c", port));
