-- CreateTable
CREATE TABLE "Target" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "topLeftX" INTEGER NOT NULL,
    "topLeftY" INTEGER NOT NULL,
    "bottomLeftX" INTEGER NOT NULL,
    "bottomLeftY" INTEGER NOT NULL,

    CONSTRAINT "Target_pkey" PRIMARY KEY ("id")
);
