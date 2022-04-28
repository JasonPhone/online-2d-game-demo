import { Command } from "@colyseus/command"
import { Client, Room } from "colyseus"
import { Cell } from "../../customtypes/GameState"
import { GameRoom } from "../rooms/GameRoom"
import NextTurnCommand from "./NextTurnCommand"
type Payload = {
    client: Client
    index: number
}
export default class PlayerSelectCommand extends Command<GameRoom, Payload> {
    execute(payload: Payload) {
        const { client, index } = payload;
        const clientIdx = this.room.clients.findIndex(c => c.id === client.id);
        if (clientIdx == -1) {
            throw new Error(`PlayerSelectCommands::execute: cannot find client with id ${client.id}`);
        }
        const cellVal = clientIdx === 0 ? Cell.X : Cell.O;
        this.room.state.board[index] = cellVal;
        console.log("PlayerSelectCommand::execute: cell", index, "set to", cellVal, "by client", client.id);
        return new NextTurnCommand();
    }
}
