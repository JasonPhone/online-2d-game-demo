/**
 * game scene
 */
import Phaser from "phaser";
import Server from "../services/Server";
import { GameState } from "~/customtypes/types";

export default class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }
    async create(data: { server: Server }) {
        console.log("GameScene::create: game scene created");
        const { server } = data;
        await server.join(); // continue the flow after the sever.join() done
        server.onceStateChanged(this.createBoard, this);

    }
    private createBoard(state: GameState) {
        const cellLen = 128, spacing = 5;
        const { width, height } = this.scale;
        // console.log(width, height);
        let x = width * 0.5 - cellLen, y = height * 0.5 - cellLen;
        state.board.forEach((sellState, idx) => {
            // drawing
            this.add.rectangle(x, y, cellLen, cellLen, 0xFFFFFF);
            x += cellLen + spacing; // length and spacing
            if (idx % 3 === 2) {
                y += cellLen + spacing;
                x = width * 0.5 - cellLen;
            }
        });
    }
}
