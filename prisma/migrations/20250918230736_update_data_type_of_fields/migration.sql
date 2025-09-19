/*
  Warnings:

  - The `status` column on the `extensions` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."ExtensionStatus" AS ENUM ('active', 'inactive');

-- AlterTable
ALTER TABLE "public"."extensions" DROP COLUMN "status",
ADD COLUMN     "status" "public"."ExtensionStatus" NOT NULL DEFAULT 'inactive';
