// src/server.js
require("@babel/register");
const Server = require("boardgame.io/server").Server;
const Huit = require("./games/huit/game").Huit;
const server = Server({ games: [Huit] });

const port = process.env.PORT || 8000;
server.run(port, () => console.log("server running on %c", port));
