import { Command } from "@colyseus/command";
import { Room } from "colyseus";
import { GameRoom } from "../rooms/GameRoom";

type Payload = {

}
export default class NextTurnCommand extends Command<GameRoom, Payload> {
    execute(payload: Payload) {
        this.room.state.activePlayer ^= 1;
        console.log("NextTurnCommand::");
        console.log("activePlayer set to", this.room.state.activePlayer);
    }
}
