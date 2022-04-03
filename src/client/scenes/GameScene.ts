/**
 * game scene
 */
import Phaser, { Math } from "phaser";
import Server from "../services/Server";
import { Cell, GameState } from "../../customtypes/GameState";

class CellRecord {
    backg: Phaser.GameObjects.Rectangle;
    value: Cell = Cell.Empty;
    constructor(rec: Phaser.GameObjects.Rectangle, cell: Cell) {
        this.backg = rec;
        this.value = cell;
    }

}
export default class GameScene extends Phaser.Scene {
    private server!: Server;
    private board: CellRecord[] = [];
    constructor() {
        super("GameScene");
        this.board.length = 0;
    }
    async create(data: { server: Server }) {
        console.log("GameScene::create: game scene created");
        const { server } = data;
        this.server = server;
        if (!this.server) {
            throw new Error("GameScene::create: no game server");
        }
        await this.server.join(); // continue the flow after the sever.join() done
        this.server.onceStateChanged(this.createBoard, this);
        this.server.followStateUpdated(this.updateBoard, this);
    }
    private createBoard(state: GameState) {
        const cellLen = 128, spacing = 5;
        const { width, height } = this.scale;
        // console.log(width, height);
        let x = width * 0.5 - cellLen, y = height * 0.5 - cellLen;
        state.board.forEach((cellState, idx) => {
            // drawing
            const rec = this.add.rectangle(x, y, cellLen, cellLen, 0xFFFFFF)
                .setInteractive()
                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                    // x and y are not in this domain and will not change in callback
                    this.server.takeTurn(idx);
                });
            this.board.push(new CellRecord(rec, Cell.Empty));
            x += cellLen + spacing; // length and spacing
            if (idx % 3 === 2) {
                y += cellLen + spacing;
                x = width * 0.5 - cellLen;
            }
        });
        this.updateBoard(state);
    }
    private updateBoard(state: GameState) {
        for (let i = 0; i < state.board.length; i++) {
            const cellRec = this.board[i];
            if (cellRec.value === Cell.Empty && cellRec.value !== state.board[i]) {
                if (state.board[i] == Cell.X)
                    this.add.star(cellRec.backg.x, cellRec.backg.y, 4, 4, 50, 0xFF0000).setAngle(45);
                else if (state.board[i] == Cell.O) {
                    this.add.circle(cellRec.backg.x, cellRec.backg.y, 40, 0x00FF00);
                    this.add.circle(cellRec.backg.x, cellRec.backg.y, 35, 0xFFFFFF);
                }
                cellRec.value = state.board[i];
            }
        }
    }
}
