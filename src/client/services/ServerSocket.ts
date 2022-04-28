/** 
 * handle commuication between server and client
 * from client-side, using colyseus.js
 */
import { Client, Room } from "colyseus.js";
// this script works at front-end so we can use phaser
import Phaser from "phaser";
import { GameState } from "customtypes/GameState";
import { Message } from "../../customtypes/GameMessage";


export default class ServerSocket {
    private client: Client;
    private room!: Room<GameState>;
    private events: Phaser.Events.EventEmitter;
    private playerIdx = -1;

    constructor() {
        console.log("connect to server");
        this.client = new Client("ws://localhost:2567");

        this.events = new Phaser.Events.EventEmitter();
        console.log("client id", this.client);
    }
    get playerIndex() {
        return this.playerIdx;
    }
    async join() {
        // use type parameter to better specify the room
        this.room = await this.client.joinOrCreate<GameState>("GameRoom");
        console.log("Server::join: room", this.room);
        this.room.onMessage(Message.playerIndex, (message: {playerIndex: number}) => {
            console.log("Server::join: got index", message.playerIndex);
            this.playerIdx = message.playerIndex;
        });
        this.room.onStateChange.once(state => {
            // called at first state, a one-time listener
            console.log("Server::join: first state", state);
            // calls the listener(s) registered for the event "once-state-changed"
            this.events.emit("once-state-changed", state);
        });
        this.room.onStateChange(state => {
            // called at following state update
            console.log("Server::join: update state", state);
            // calls the listener(s) registered for the event "follow-state-updated"
            this.events.emit("follow-state-updated", state);
        });
    }
    takeTurn(idx: number) {
        if (!this.room) {
            return;
        }
        if (this.playerIndex != this.room.state.activePlayer) {
            console.log("Server::takeTurn: player inactive", this.playerIndex, this.room.state.activePlayer);
            return;
        }
        // send the message
        console.log("Server::takeTurn: player take turn on cell", idx);
        this.room.send(Message.playerSelection, { index: idx });
    }
    onceStateChanged(callback: (state: GameState) => void, context?: any) {
        // add a one-time listener to event, for Phaser
        this.events.once("once-state-changed", callback, context);
        console.log("Server::onceStateChanged: event emitted");
    }
    followStateUpdated(callback: (state: GameState) => void, context?: any) {
        // add a one-time listener to event, for Phaser
        this.events.on("follow-state-updated", callback, context);
        console.log("Server::followStateUpdated: event emitted");
    }
}
