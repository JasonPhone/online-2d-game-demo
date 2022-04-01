/**
 * game scene
 */
import Phaser from "phaser";
import Server from "../services/Server";

export default class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }
    create(data: { server: Server }) {
        console.log("GameScene::create: game scene created");
        const {server} = data;
        server.join();
    }
}
