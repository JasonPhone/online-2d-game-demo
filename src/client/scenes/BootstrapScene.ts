/**
 * init scene for
 *      handle logic between scenes
 *      inject network services into scenes
 */
import Phaser from "phaser";
import Server from "client/services/Server";

export default class BootstrapScene extends Phaser.Scene {
    private server: Server;
    constructor() {
        super("BootstrapScene");  // scene id
        this.server = new Server();
    }
    init() {
    }
    create() {
        console.log("BootstrapScene::create: bootstrap scene created");
        this.scene.launch("GameScene", {
            server: this.server,  // pass the server to GameScene
        });
    }
}
