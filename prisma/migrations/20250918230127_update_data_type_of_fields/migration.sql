/*
  Warnings:

  - You are about to drop the column `active` on the `extensions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."extensions" DROP COLUMN "active",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'inactive';
