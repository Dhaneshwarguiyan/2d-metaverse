import Phaser from "phaser";

interface keyType {
  up: Phaser.Input.Keyboard.Key;
  down: Phaser.Input.Keyboard.Key;
  left: Phaser.Input.Keyboard.Key;
  right: Phaser.Input.Keyboard.Key;
}

export default class WorldScene extends Phaser.Scene {
  socket!: WebSocket | null;
  player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  // cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
  otherPlayer!: Map<string, Phaser.Types.Physics.Arcade.SpriteWithDynamicBody>;
  private _id!: string;

  //properties of class
  map!: Phaser.Tilemaps.Tilemap;
  tile1!: Phaser.Tilemaps.Tileset | null;
  tile2!: Phaser.Tilemaps.Tileset | null;
  floor!: Phaser.Tilemaps.TilemapLayer | null;
  border!: Phaser.Tilemaps.TilemapLayer | null;
  decoration1!: Phaser.Tilemaps.TilemapLayer | null;
  decoration2!: Phaser.Tilemaps.TilemapLayer | null;
  decoration3!: Phaser.Tilemaps.TilemapLayer | null;
  foreground!: Phaser.Tilemaps.TilemapLayer | null;
  obstacles!: Phaser.Tilemaps.TilemapLayer | null;
  name!: string;
  room!: string;
  messageListener!: (event: { data: string }) => void;
  cursors: keyType | undefined;

  constructor(scene: string) {
    super({ key: scene });
    this.otherPlayer = new Map();
  }

  init(data: { socket: WebSocket; name: string; room: string }) {
    this.socket = data.socket;
    this.name = data.name;
    this.room = data.room;
  }

  preload() {
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
    // this.socket = new WebSocket('ws://localhost:8080');

    this.map = this.make.tilemap({ key: "map" });
    this.tile1 = this.map.addTilesetImage("magecity", "tile1");
    this.tile2 = this.map.addTilesetImage("container", "tile2");

    //creating layers
    if (this.tile1 && this.tile2) {
      this.floor = this.map.createLayer(
        "floor",
        [this.tile1, this.tile2],
        0,
        0,
      );
      this.border = this.map.createLayer(
        "border",
        [this.tile1, this.tile2],
        0,
        0,
      );
      this.decoration1 = this.map.createLayer(
        "decoration1",
        [this.tile1, this.tile2],
        0,
        0,
      );
      this.decoration2 = this.map.createLayer(
        "decoration2",
        [this.tile1, this.tile2],
        0,
        0,
      );
      this.decoration3 = this.map.createLayer(
        "decoration3",
        [this.tile1, this.tile2],
        0,
        0,
      );
      this.player = this.physics.add.sprite(300, 400, "player", 6);
      this.foreground = this.map.createLayer(
        "foreground",
        [this.tile1, this.tile2],
        0,
        0,
      );
      this.obstacles = this.map.createLayer(
        "obstacles",
        [this.tile1, this.tile2],
        0,
        0,
      );
      this.foreground?.setDepth(1);
      this.obstacles?.setDepth(1);
    }

    this.obstacles?.setCollisionByExclusion([-1]);

    //increase the size of the spirite
    this.player.displayWidth = 27;
    this.player.scaleY = this.player.scaleX;

    const generateId = () => {
      const random = "abcdefghijklmnopqrstuvwxyz1234567890";
      let answer = "";
      for (let i = 0; i < 8; i++) {
        answer = answer + random[Math.floor(Math.random() * 36)];
      }
      return answer;
    };

    this._id = generateId();

    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(
        JSON.stringify({
          type: "joingame",
          payload: {
            id: this._id,
            x: this.player.x,
            y: this.player.y,
            room: this.room,
          },
        }),
      );
      console.log("client connected to server");
    }

    //generate a diffrent sort of id cause it can cause errors cause two people can have the same id

    //listen for the updates for other players from server
    this.messageListener = (event: { data: string }) => {
      const parsedData = JSON.parse(event.data);
      if (parsedData.type === "init") {
        //initializing other players
        parsedData.players.forEach(
          (playerData: { id: string; x: number; y: number }) => {
            if (playerData.id !== this._id && playerData.x && playerData.y) {
              const otherPlayer = this.physics.add.sprite(
                playerData.x,
                playerData.y,
                "player",
                6,
              );
              otherPlayer.displayWidth = 27;
              otherPlayer.scaleY = otherPlayer.scaleX;
              this.otherPlayer.set(playerData.id, otherPlayer);
            }
          },
        );
      } else if (parsedData.type === "updatePlayer") {
        const { id, x, y } = parsedData.payload;
        //check if the player being updated is present in the map or not
        if (!this.otherPlayer.has(id)) {
          //create a new player if not already in the map
          const otherPlayer = this.physics.add.sprite(x, y, "player", 6);
          otherPlayer.displayWidth = 27;
          otherPlayer.scaleY = otherPlayer.scaleX;
          this.otherPlayer.set(id, otherPlayer);
        } else {
          const otherPlayer = this.otherPlayer.get(id);
          if (otherPlayer) {
            otherPlayer.setPosition(x, y);
          }
        }
      } else if (parsedData.type === "removePlayer") {
        const { id } = parsedData.payload;
        const otherPlayer = this.otherPlayer.get(id);
        if (otherPlayer) {
          otherPlayer.destroy(); //destroy the spirit
          this.otherPlayer.delete(id); //remove from the map
        }
      }
    };

    this.socket?.addEventListener("message", this.messageListener);

    //emit player position to the server in regular interval
    this.time.addEvent({
      delay: 1000,
      callback: () => {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
          this.socket.send(
            JSON.stringify({
              type: "updatePlayer",
              payload: {
                id: this._id,
                x: this.player.x,
                y: this.player.y,
                room: this.room,
              },
            }),
          );
        }
      },
      loop: true,
    });

    //spirite animations
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [1, 7, 1, 13],
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [1, 7, 1, 13],
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [2, 8, 2, 14],
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [0, 6, 0, 12],
      }),
      frameRate: 10,
      repeat: -1,
    });

    //setting player bound

    this.physics.world.bounds.width = this.map.widthInPixels;
    this.physics.world.bounds.height = this.map.heightInPixels;
    this.player.setCollideWorldBounds(true);

    //adding colliding physics with obstacles

    if (this.obstacles) this.physics.add.collider(this.player, this.obstacles);

    //adding cursor keys for our spirits
    // this.cursors = this.input.keyboard?.createCursorKeys();
    this.cursors = this.input.keyboard?.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.UP,
      down: Phaser.Input.Keyboard.KeyCodes.DOWN,
      left: Phaser.Input.Keyboard.KeyCodes.LEFT,
      right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
    }) as keyType;

    // this.input.keyboard.on('keydown', (event) => {
    //     if (event.code === 'Space' && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) {
    //         event.stopPropagation(); // Prevent Phaser from handling this event
    //         return;
    //     }
    // });
    //camera controls
    this.cameras.main.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels,
    );
    this.cameras.main.setZoom(2.5);
    this.cameras.main.startFollow(this.player);
  }

  update(): void {
    this.player.body.setVelocity(0);

    //movements
    if (this.cursors && this.cursors.left.isDown) {
      this.player.body.setVelocityX(-80);
    } else if (this.cursors && this.cursors.right.isDown) {
      this.player.body.setVelocityX(80);
    } else if (this.cursors && this.cursors.down.isDown) {
      this.player.body.setVelocityY(80);
    } else if (this.cursors && this.cursors.up.isDown) {
      this.player.body.setVelocityY(-80);
    }

    //animations

    if (this.cursors && this.cursors.left.isDown) {
      this.player.anims.play("left", true);
      this.player.flipX = true;
    } else if (this.cursors && this.cursors.right.isDown) {
      this.player.anims.play("right", true);
      this.player.flipX = false;
    } else if (this.cursors && this.cursors.down.isDown) {
      this.player.anims.play("down", true);
    } else if (this.cursors && this.cursors.up.isDown) {
      this.player.anims.play("up", true);
    } else {
      this.player.anims.stop();
    }

    // this.input.on('wheel', (deltaY: number) => {
    //     const zoomFactor = camera.zoom - deltaY * 0.001; // Adjust zoom sensitivity
    //     camera.setZoom(Phaser.Math.Clamp(zoomFactor, 0.5, 2)); // Restrict zoom levels
    //   });
  }

  shutdown() {
    if (this.socket) {
      this.socket.removeEventListener("message", this.messageListener);
    }
  }
}
