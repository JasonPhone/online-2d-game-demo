import { Command } from "@colyseus/command";
import { Room } from "colyseus";
import { GameRoom } from "../rooms/GameRoom";
import { Message } from "../../customtypes/GameMessage"
import { Cell } from "../../customtypes/GameState"

type Payload = {
}
export default class CheckWinCommand extends Command<GameRoom, Payload> {
    private getCell(x: number, y: number) : Cell{
        return this.room.state.board[x * 3 + y];
        // return Cell.Empty;
    }
    private check(): number {
        // row
        for (let rc = 0; rc < 3; rc++) {
            const cell = this.getCell(rc, 0);
            if (cell === this.getCell(rc, 1) && cell === this.getCell(rc, 2) && cell !== Cell.Empty) {
                return cell === Cell.X ? 0 : 1;
            }
        }
        // col 
        for (let cc = 0; cc < 3; cc++) {
            const cell = this.getCell(0, cc);
            if (cell === this.getCell(1, cc) && cell === this.getCell(2, cc) && cell !== Cell.Empty) {
                return cell === Cell.X ? 0 : 1;
            }
        }
        // diag
        const cell = this.getCell(1, 1);
        if ((cell === this.getCell(0, 0) && cell == this.getCell(2, 2)) || (cell === this.getCell(0, 2) && cell == this.getCell(2, 0))) {
            if (cell !== Cell.Empty) {
                return cell === Cell.X ? 0 : 1;
            }
        }
        // draw or continue
        this.room.state.board.forEach((value: Cell)=> {
            if (value === Cell.Empty) return -2;
        }); 
        // draw
        return -1;
    }
    execute(payload: Payload) {
        const boardState = this.check();
        switch (boardState) {
            case -2:
                this.room.broadcast(Message.boardCont);
            case -1:
                this.room.broadcast(Message.boardDraw);
            case 0:
                this.room.broadcast(Message.boardAWin);
            case 1:
                this.room.broadcast(Message.boardBWin);
        }
        this.room.state.winPlayer = boardState;
    }
}
