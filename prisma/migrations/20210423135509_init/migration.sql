-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "floor" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" SERIAL NOT NULL,
    "roomId" INTEGER NOT NULL,
    "fromDate" TIMESTAMP(3) NOT NULL,
    "toDate" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);
