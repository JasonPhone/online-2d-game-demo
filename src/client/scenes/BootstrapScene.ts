/**
 * init scene for
 *      handle logic between scenes
 *      inject network services into scenes
 */
import Phaser from "phaser";
import ServerSocket from "../services/ServerSocket";

export default class BootstrapScene extends Phaser.Scene {
    // private server: ServerSocket;
    constructor() {
        super("BootstrapScene");  // scene id
        // this.server = new ServerSocket();
    }
    init() {
    }
    create() {
        console.log("BootstrapScene::create: bootstrap scene created");
        this.scene.launch("GameScene", {
            // server: this.server,  // pass the server to GameScene
        });
    }
}
