import { useEffect, useRef } from "react";
import Phaser from "phaser";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { mapType } from "../types/types";
import WorldScene from "./scenes/WorldMap1";
import { spriteType } from "../types/types";
import { spriteAssetsType } from "../types/types";

const Game = ({
  mapData,
  socket,
  room,
  spritesAssets,
  sprites,
}: {
  mapData: mapType;
  socket: WebSocket;
  room: string;
  spritesAssets: spriteAssetsType[];
  sprites: spriteType[];
}) => {
  const name = useSelector((state: RootState) => state.user.info?.username);
  const gameContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const gameObj = new WorldScene({
      scene: "gameObj",
      mapData: mapData,
      spritesAssets,
      sprites,
    });
    const data = { socket: socket, name: name, room: room };
    //config object
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 1680,
      height: 870,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0, x: 0 },
        },
      },
      scale: {
        mode: Phaser.Scale.ENVELOP,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      scene: [gameObj],
      parent: gameContainerRef.current || undefined,
    };

    const game = new Phaser.Game(config);
    game.scene.start("gameObj", data);
    return () => {
      game.destroy(true);
    };
  }, [socket, name, room]);
  return (
    <div ref={gameContainerRef} className="w-screen h-screen relative"></div>
  );
};

export default Game;
