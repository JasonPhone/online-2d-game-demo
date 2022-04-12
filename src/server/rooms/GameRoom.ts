import { Client, Room } from "colyseus";
import { Message } from "customtypes/GameMessage";
// import { Client } from "colyseus.js";
import { GameRoomState } from "server/states/GameRoomState";
import { Dispatcher } from "@colyseus/command";
import PlayerCommand from "server/commands/PlayerCommands";

export class GameRoom extends Room<GameRoomState> {
    maxClients: number = 2;
    private dispacher: Dispatcher<GameRoom> = new Dispatcher(this);
    onCreate() {
        // setup schema
        this.setState(new GameRoomState());
        this.onMessage(Message.playerSelection, (client, message: { index: number }) => {
            // console.log("GameRoom:: player selection from", client.id, message);
            console.log("GameRoom:: player", client.id, "takes turn", message);
            // capsule the logic
            this.dispacher.dispatch(new PlayerCommand(), {
                client,
                index: message.index
            })
        });
    }
    onJoin(client) {
        console.log(`GameRoom::onJoin: ${client.id} joined`);
    }
    onLeave(client) {
        console.log(`GameRoom::onJoin: ${client.id} left`);
    }
    onDispose() {
        console.log("GameRoom::onDispose: disposed");
    }
}
