/**
 * game scene
 */
import Phaser, { Math } from "phaser";
import ServerSocket from "~/client/services/ServerSocket";

export default class GameScene extends Phaser.Scene {
    // private server!: ServerSocket;
    constructor() {
        super("GameScene");
    }
    preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    }
    create(data: { server: ServerSocket }) {
        console.log("GameScene::create: game scene created");
        // const { server } = data;
        // this.server = server;
        // if (!this.server) {
        //     throw new Error("GameScene::create: no game server");
        // }
        // await this.server.join(); // continue the flow after the sever.join() done

        // this.server.onceStateChanged(this.createBoard, this);
        // this.server.followStateUpdated(this.updateBoard, this);

        this.add.image(400, 300, "sky");
        this.add.text(400, 300, "hello", {
            color: "#FFFFFF",
        })

    }
}
