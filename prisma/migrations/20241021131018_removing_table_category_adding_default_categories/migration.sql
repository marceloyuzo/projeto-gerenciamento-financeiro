/*
  Warnings:

  - The values [deposit,credit,debit] on the enum `TypeOperation` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `category_id` on the `operations` table. All the data in the column will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `operations` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TypeCategory" AS ENUM ('Housing', 'Food', 'Transport', 'Health', 'Education', 'Leisure', 'Investment');

-- AlterEnum
BEGIN;
CREATE TYPE "TypeOperation_new" AS ENUM ('Deposit', 'Credit', 'Debit');
ALTER TABLE "operations" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "operations" ALTER COLUMN "type" TYPE "TypeOperation_new" USING ("type"::text::"TypeOperation_new");
ALTER TYPE "TypeOperation" RENAME TO "TypeOperation_old";
ALTER TYPE "TypeOperation_new" RENAME TO "TypeOperation";
DROP TYPE "TypeOperation_old";
ALTER TABLE "operations" ALTER COLUMN "type" SET DEFAULT 'Deposit';
COMMIT;

-- DropForeignKey
ALTER TABLE "operations" DROP CONSTRAINT "operations_category_id_fkey";

-- AlterTable
ALTER TABLE "operations" DROP COLUMN "category_id",
ADD COLUMN     "category" "TypeCategory" NOT NULL,
ALTER COLUMN "type" SET DEFAULT 'Deposit';

-- DropTable
DROP TABLE "categories";
