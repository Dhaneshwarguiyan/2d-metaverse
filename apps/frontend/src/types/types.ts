export interface assetsType {
  id: number;
  mapId: number;
  name: string;
  path: string;
}

export interface layersType {
  id: number;
  name: string;
  depth: number;
  mapId: number;
}

export interface mapType {
  id: number;
  name: string;
  tileSet: string;
  layers?: layersType[];
  assets?: assetsType[];
}
export interface spriteAssetsType {
  key: number;
  path: string;
  frameWidth: number;
  frameHeight: number;
}

enum animationKeys {
  left,
  right,
  up,
  down,
}

export interface animationsType {
  id: number;
  key: animationKeys;
  frames: number[];
  spriteId: number;
}

export interface spriteType {
  id: number;
  key: number;
  initialState: number;
  animations: animationsType[];
}
