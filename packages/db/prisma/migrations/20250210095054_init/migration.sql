-- CreateEnum
CREATE TYPE "AnimationKeys" AS ENUM ('left', 'right', 'up', 'down');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "visitedRooms" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Messages" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "room" TEXT NOT NULL,
    "sender" TEXT NOT NULL,
    "read" TEXT[],
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Maps" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "tileSet" TEXT NOT NULL,

    CONSTRAINT "Maps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rooms" (
    "id" SERIAL NOT NULL,
    "room" TEXT NOT NULL,
    "mapId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MapLayers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "depth" INTEGER NOT NULL,
    "mapId" INTEGER NOT NULL,

    CONSTRAINT "MapLayers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MapAssets" (
    "id" SERIAL NOT NULL,
    "path" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mapId" INTEGER NOT NULL,

    CONSTRAINT "MapAssets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpriteAssets" (
    "key" SERIAL NOT NULL,
    "path" TEXT NOT NULL,
    "frameWidth" INTEGER NOT NULL,
    "frameHeight" INTEGER NOT NULL,

    CONSTRAINT "SpriteAssets_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "Sprites" (
    "id" SERIAL NOT NULL,
    "initialState" INTEGER NOT NULL,
    "key" INTEGER NOT NULL,

    CONSTRAINT "Sprites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpriteAnimations" (
    "id" SERIAL NOT NULL,
    "key" "AnimationKeys" NOT NULL,
    "frames" INTEGER[],
    "spriteId" INTEGER NOT NULL,

    CONSTRAINT "SpriteAnimations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedbacks" (
    "id" SERIAL NOT NULL,
    "feedback" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Feedbacks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Maps_name_key" ON "Maps"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Rooms_room_key" ON "Rooms"("room");

-- CreateIndex
CREATE UNIQUE INDEX "MapAssets_path_key" ON "MapAssets"("path");

-- CreateIndex
CREATE UNIQUE INDEX "MapAssets_name_key" ON "MapAssets"("name");

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rooms" ADD CONSTRAINT "Rooms_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Maps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rooms" ADD CONSTRAINT "Rooms_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MapLayers" ADD CONSTRAINT "MapLayers_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Maps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MapAssets" ADD CONSTRAINT "MapAssets_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Maps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sprites" ADD CONSTRAINT "Sprites_key_fkey" FOREIGN KEY ("key") REFERENCES "SpriteAssets"("key") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpriteAnimations" ADD CONSTRAINT "SpriteAnimations_spriteId_fkey" FOREIGN KEY ("spriteId") REFERENCES "Sprites"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
