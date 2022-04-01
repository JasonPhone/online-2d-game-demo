/** 
 * handle commuication between server and client
 * from client-side, using colyseus.js
 */
import { Client } from "colyseus.js";
// this script works at front-end so we can use phaser
import Phaser from "phaser";
import { GameState } from "~/customtypes/types";

export default class Server {
    private client: Client;
    private events: Phaser.Events.EventEmitter;
    constructor() {
        console.log("connect to server");
        this.client = new Client("ws://localhost:2567");
        this.events = new Phaser.Events.EventEmitter();
        console.log("client id", this.client);
    }
    async join() {
        // use type parameter to better specify the room
        const room = await this.client.joinOrCreate<GameState>("GameRoom");
        console.log("Server::join: room", room);
        // called at first state, a one-time listener 
        room.onStateChange.once(state => {
            console.log("Server::join: first state", state);
            // calls the listener(s) registered for the event "once-state-changed"
            this.events.emit("once-state-changed", state);
        })
        // called at following state update
        room.onStateChange(state => {
            console.log("Server::join: update state", state);
            // calls the listener(s) registered for the event "follow-state-updated"
            this.events.emit("follow-state-updated", state);
        })
    }
    onceStateChanged(callback: (state: GameState) => void, context?: any) {
        // add a one-time listener to event
        this.events.once("once-state-changed", callback, context);
    }
}
