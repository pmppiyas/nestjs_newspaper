-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'JOURNALIST', 'READER');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'READER';
