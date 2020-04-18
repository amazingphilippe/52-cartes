// src/server.js
import { Server } from "boardgame.io/server";
import { Huit } from "./games/Huit";

const server = Server({ games: [Huit] });

const port = process.env.PORT || 8000;
server.run(port, () => console.log("server running on %c", port));
