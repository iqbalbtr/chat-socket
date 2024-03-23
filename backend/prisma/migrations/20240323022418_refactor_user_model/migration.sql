/*
  Warnings:

  - You are about to drop the column `passwors` on the `user` table. All the data in the column will be lost.
  - Added the required column `password` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "token" TEXT,
    "socket_token" TEXT
);
INSERT INTO "new_user" ("id", "token", "username") SELECT "id", "token", "username" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");
CREATE UNIQUE INDEX "user_token_key" ON "user"("token");
CREATE UNIQUE INDEX "user_socket_token_key" ON "user"("socket_token");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
