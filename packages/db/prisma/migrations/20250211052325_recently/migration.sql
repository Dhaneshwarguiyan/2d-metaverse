/*
  Warnings:

  - You are about to drop the column `visitedRooms` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "visitedRooms";

-- CreateTable
CREATE TABLE "visitedSpaces" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "roomId" INTEGER NOT NULL,
    "lastVisited" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "visitedSpaces_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "visitedSpaces" ADD CONSTRAINT "visitedSpaces_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visitedSpaces" ADD CONSTRAINT "visitedSpaces_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
