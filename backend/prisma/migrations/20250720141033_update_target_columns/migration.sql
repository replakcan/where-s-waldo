/*
  Warnings:

  - You are about to drop the column `bottomLeftX` on the `Target` table. All the data in the column will be lost.
  - You are about to drop the column `bottomLeftY` on the `Target` table. All the data in the column will be lost.
  - Added the required column `bottomRightX` to the `Target` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bottomRightY` to the `Target` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Target" DROP COLUMN "bottomLeftX",
DROP COLUMN "bottomLeftY",
ADD COLUMN     "bottomRightX" INTEGER NOT NULL,
ADD COLUMN     "bottomRightY" INTEGER NOT NULL;
