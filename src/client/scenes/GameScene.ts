/**
 * game scene
 */
import Phaser from "phaser";
import Server from "../services/Server";
import { GameState } from "../../customtypes/GameState";

export default class GameScene extends Phaser.Scene {
    private server!: Server;
    constructor() {
        super("GameScene");
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
    }
    private createBoard(state: GameState) {
        const cellLen = 128, spacing = 5;
        const { width, height } = this.scale;
        // console.log(width, height);
        let x = width * 0.5 - cellLen, y = height * 0.5 - cellLen;
        state.board.forEach((cellState, idx) => {
            // drawing
            this.add.rectangle(x, y, cellLen, cellLen, 0xFFFFFF)
                .setInteractive()
                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                    // x and y are not in this domain and will not change in callback
                    this.server.takeTurn(idx);
                });
            x += cellLen + spacing; // length and spacing
            if (idx % 3 === 2) {
                y += cellLen + spacing;
                x = width * 0.5 - cellLen;
            }
        });
    }
}
