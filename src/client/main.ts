import Phaser, { Game } from "phaser";
import BootstrapScene from "./scenes/BootstrapScene";
import GameScene from "./scenes/GameScene";

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: "arcade",
		arcade: {
			gravity: {
				x: 0,
				y: 200,
			}
		}
	},
	scene: [BootstrapScene, GameScene]
	// scene: [HelloWorldScene]
}

export default new Phaser.Game(config)
