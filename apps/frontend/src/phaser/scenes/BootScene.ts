import Phaser from "phaser";
import { mapType, spriteAssetsType, spriteType } from "../../types/types";

interface dataType {
  scene: string;
  mapData: mapType;
  spritesAssets: spriteAssetsType[];
  sprites: spriteType[];
}

export default class BootScene extends Phaser.Scene {
  private loadingBar!: Phaser.GameObjects.Graphics;
  private progressBox!: Phaser.GameObjects.Graphics;
  worldData!: dataType;
  mapData!: mapType;
  spriteAssets!: spriteAssetsType[];
  sprites!: spriteType[];
  
  constructor() {
    super("BootScene");
  }

  init(data: dataType) {
    this.worldData = data;
    this.mapData = data.mapData;
    this.spriteAssets = data.spritesAssets;
    this.sprites = data.sprites;
  }

  preload() {
    this.createLoadingBar();

    // Update progress bar while assets are loading
    this.load.on("progress", (value: number) => {
      this.loadingBar.clear();
      this.loadingBar.fillStyle(0xffffff, 1);
      this.loadingBar.fillRect(160, 240, 320 * value, 30);
    });
        //assets such as tile image
        this.mapData.assets?.forEach((asset) => {
          this.load.image(`${asset.id.toString()}`, asset.path);
        });
    
        //load tileset
        this.load.tilemapTiledJSON("map", this.mapData.tileSet);
    
        //load character
        this.spriteAssets.forEach((sprite) => {
          this.load.spritesheet(`${sprite.key.toString()}-sprite`, sprite.path, {
            frameWidth: sprite.frameWidth,
            frameHeight: sprite.frameHeight,
          });
        });
    // Create loading screen
    this.add.text(500,500,"loading...");
    this.load.on("complete", () => {
      this.scene.start("WorldScene1",this.worldData); // Switch after loading
    });
  }
  createLoadingBar() {
    this.progressBox = this.add.graphics();
    this.loadingBar = this.add.graphics();

    // Progress box background
    this.progressBox.fillStyle(0x222222, 0.8);
    this.progressBox.fillRect(150, 230, 340, 50);

    // Loading text
    this.add.text(250, 200, "Loading...", {
      font: "20px Arial",
    });
  }
}
