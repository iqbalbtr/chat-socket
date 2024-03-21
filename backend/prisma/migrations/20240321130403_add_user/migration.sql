-- CreateTable
CREATE TABLE "user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "passwors" TEXT NOT NULL,
    "token" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");
