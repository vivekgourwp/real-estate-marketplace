/*
  Warnings:

  - You are about to drop the column `title` on the `Property` table. All the data in the column will be lost.
  - Added the required column `title1` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Property" DROP COLUMN "title",
ADD COLUMN     "title1" TEXT NOT NULL;
