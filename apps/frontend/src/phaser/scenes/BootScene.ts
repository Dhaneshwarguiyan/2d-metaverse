import Phaser from "phaser";

export default class BootScene extends Phaser.Scene {
  socket!: WebSocket;
  constructor() {
    super({ key: "BootSene" });
  }
  // init(data:WebSocket){
  //     this.socket = data;
  // }
  preload() {
    //load tiles imges
    this.load.image("tile1", "assets/magecity.png");
    this.load.image("tile2", "assets/container.png");

    //load tileset
    this.load.tilemapTiledJSON("map", "assets/forest3.json");

    //load character
    this.load.spritesheet("player", "assets/sprite.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
  }
  create() {
    this.scene.start("WorldScene");
  }
}
