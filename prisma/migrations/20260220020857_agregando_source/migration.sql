/*
  Warnings:

  - A unique constraint covering the columns `[userId,source,externalId]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,source,externalId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "DataSource" AS ENUM ('INTERNAL', 'LOYVERSE', 'OTHER');

-- DropIndex
DROP INDEX "Category_userId_externalId_key";

-- DropIndex
DROP INDEX "Product_userId_externalId_key";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "source" "DataSource" NOT NULL DEFAULT 'INTERNAL',
ALTER COLUMN "externalId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "source" "DataSource" NOT NULL DEFAULT 'INTERNAL',
ALTER COLUMN "externalId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "loyverseKeyHash" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_userId_source_externalId_key" ON "Category"("userId", "source", "externalId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_userId_source_externalId_key" ON "Product"("userId", "source", "externalId");
