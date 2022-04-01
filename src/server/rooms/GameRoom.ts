import { Room } from "colyseus";
// import { Client } from "colyseus.js";
import { GameRoomState } from "../States/GameRoomState";

export class GameRoom extends Room<GameRoomState> {
    maxClients: number = 2;
    onCreate() {
        // setup schema
        this.setState(new GameRoomState());

        this.onMessage("message", (client, message) => {
            console.log("GameRoom::message from", client.sessionId, message);
            this.broadcast("message", `(${client.sessionId}) ${message}`);
        });
        this.onMessage("keydown", (client, message) => {
            console.log("GameRoom::keydown from", client.sessionId, message);
            this.broadcast("keydown", message, {
                except: client,
            });
        });
    }
    onJoin(client) {
        // this.broadcast("message", `${client.sessionId} joined`);
        console.log(client.sessionId, "joined");
    }
    onLeave(client) {
        // this.broadcast("message", `${client.sessionId} leaved`);
        console.log(client.sessionId, "left");
    }
    onDispose() {
        console.log("GameRoom::disposeed");
    }
}
