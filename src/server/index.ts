/**
 * IMPORTANT: 
 * ---------
 * Do not manually edit this file if you'd like to use Colyseus Arena
 * 
 * If you're self-hosting (without Arena), you can manually instantiate a
 * Colyseus Server as documented here: 👉 https://docs.colyseus.io/server/api/#constructor-options 
 */
// import { listen } from "@colyseus/arena";

// // Import arena config
// import arenaConfig from "./arena.config";

// // Create and listen on 2567 (or PORT environment variable.)
// listen(arenaConfig);
import { Server } from "colyseus"
import { DefaultRoom } from "./rooms/DefaultRoom";
const port = 10001 
const gameServer = new Server()
gameServer.define("default", DefaultRoom);
gameServer.listen(port)
console.log(`[GameServer] Listening on Port: ${port}`)

