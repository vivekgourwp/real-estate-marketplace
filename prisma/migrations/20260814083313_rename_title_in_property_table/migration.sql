/*
  Warnings:

  - You are about to drop the column `title1` on the `Property` table. All the data in the column will be lost.
  - Added the required column `title` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Property" DROP COLUMN "title1",
ADD COLUMN     "title" TEXT NOT NULL;
