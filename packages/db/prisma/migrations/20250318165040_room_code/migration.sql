/*
  Warnings:

  - You are about to drop the column `room` on the `Messages` table. All the data in the column will be lost.
  - You are about to drop the column `room` on the `Rooms` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[roomCode]` on the table `Rooms` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `roomCode` to the `Messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomCode` to the `Rooms` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Rooms_room_key";

-- AlterTable
ALTER TABLE "Messages" DROP COLUMN "room",
ADD COLUMN     "roomCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Rooms" DROP COLUMN "room",
ADD COLUMN     "roomCode" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Rooms_roomCode_key" ON "Rooms"("roomCode");
