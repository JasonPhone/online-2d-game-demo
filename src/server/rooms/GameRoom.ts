import { Client, Room } from "colyseus";
import { Message } from "../../customtypes/GameMessage";
// import { Client } from "colyseus.js";
import { GameRoomState } from "../states/GameRoomState";
import { Dispatcher } from "@colyseus/command";
import PlayerSelectCommand from "../commands/PlayerSelectCommands";
import NextTurnCommand from "../commands/NextTurnCommand";

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
            this.dispacher.dispatch(new PlayerSelectCommand(), {
                client,
                index: message.index
            });
            // this.dispacher.dispatch(new NextTurnCommand(), {});
        });
    }
    onJoin(client: Client) {
        const idx = this.clients.findIndex(c => c.id === client.id);
        client.send(Message.playerIndex, { playerIndex: idx });
        console.log(`GameRoom::onJoin: ${client.id} joined, index ${idx}`);
    }
    onLeave(client: Client) {
        console.log(`GameRoom::onJoin: ${client.id} left`);
    }
    onDispose() {
        console.log("GameRoom::onDispose: disposed");
    }
}
