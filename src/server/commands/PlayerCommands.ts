import { Command } from "@colyseus/command"
import { Client, Room } from "colyseus"
import { Cell } from "../../customtypes/GameState"
import { GameRoom } from "server/rooms/GameRoom"
type Payload = {
    client: Client
    index: number
}
export default class PlayerCommand extends Command<GameRoom, Payload> {
    execute(payload: Payload) {
        const {client, index} = payload;
        const clientIdx = this.room.clients.findIndex(c => c.id === client.id);
        if (clientIdx == -1) {
            throw new Error(`PlayerCommands::execute: cannot find client with id ${client.id}`);
        }
        const cellVal =  clientIdx === 0 ? Cell.X : Cell.O;
        this.room.state.board[index] = cellVal;
        console.log("PlayerCommand::execute: cell", index, "set to", cellVal, "by client", client.id);
        return;
    }
}
