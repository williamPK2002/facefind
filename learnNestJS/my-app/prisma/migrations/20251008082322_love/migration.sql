-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SoftwareEngineer', 'SchoolOfLaw', 'HumanResources', 'SchoolOfScience');

-- CreateTable
CREATE TABLE "task" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "Report" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "task_title_key" ON "task"("title");

-- CreateIndex
CREATE UNIQUE INDEX "task_email_key" ON "task"("email");
