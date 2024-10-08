/*
  Warnings:

  - You are about to drop the column `username` on the `numberstable` table. All the data in the column will be lost.
  - Added the required column `telephone_number` to the `numberstable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "numberstable" DROP COLUMN "username",
ADD COLUMN     "telephone_number" VARCHAR(20) NOT NULL;

-- AlterTable
ALTER TABLE "userstable" ALTER COLUMN "full_name" DROP NOT NULL,
ALTER COLUMN "api_key" DROP NOT NULL;
