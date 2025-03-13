import Phaser from "phaser";
import { mapType, spriteAssetsType, spriteType } from "../../types/types";

interface dataType {
  scene: string;
  mapData: mapType;
  spritesAssets: spriteAssetsType[];
  sprites: spriteType[];
}

export default class BootScene extends Phaser.Scene {
  private loadingBox!: Phaser.GameObjects.Graphics;
  private loadingBar!: Phaser.GameObjects.Graphics;
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
    const { width, height } = this.scale; // Get screen dimensions

    // Background bar (static)
    const barWidth = 320;
    const barHeight = 30;
    const barX = (width - barWidth) / 2; // Center horizontally
    const barY = (height - barHeight) / 2; // Center vertically
  
    this.loadingBar = this.add.graphics();
    this.loadingBox = this.add.graphics();
    
    this.loadingBox.fillStyle(0x222222, 0.8); // Dark background bar
    this.loadingBox.fillRect(barX, barY, barWidth, barHeight);
    this.add.text(barX,barY,"Loading...")
    this.load.on("progress", (value: number) => {
      this.loadingBar.clear();
      this.loadingBar.fillStyle(0xffffff, 1);
      this.loadingBar.fillRect(barX, barY+30, barWidth * value, barHeight);
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
    // this.load.on("complete", () => {
    //   this.scene.start("WorldScene",this.worldData); // Switch after loading
    // });
  }
}
