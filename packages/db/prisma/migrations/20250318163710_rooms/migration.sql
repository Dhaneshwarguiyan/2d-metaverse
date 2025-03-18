/*
  Warnings:

  - A unique constraint covering the columns `[room]` on the table `Rooms` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Rooms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Messages" ALTER COLUMN "room" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Rooms" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Rooms_room_key" ON "Rooms"("room");
