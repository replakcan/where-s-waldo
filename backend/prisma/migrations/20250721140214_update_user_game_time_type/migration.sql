/*
  Warnings:

  - Changed the type of `game_time` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "game_time",
ADD COLUMN     "game_time" INTEGER NOT NULL;
