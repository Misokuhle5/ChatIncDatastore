-- CreateTable
CREATE TABLE "numberstable" (
    "uid" VARCHAR(20) NOT NULL,
    "username" VARCHAR(20) NOT NULL,
    "has_whatsapp" BOOLEAN NOT NULL DEFAULT false,
    "user_uid" VARCHAR(10) NOT NULL,
    "date_added" DATE NOT NULL,
    "date_modified" DATE NOT NULL,

    CONSTRAINT "NumbersTable_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "userstable" (
    "user_uid" VARCHAR(10) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "full_name" VARCHAR(255) NOT NULL,
    "api_key" VARCHAR(255) NOT NULL,
    "date_added" DATE NOT NULL,
    "date_modified" DATE NOT NULL,

    CONSTRAINT "UsersTable_pkey" PRIMARY KEY ("user_uid")
);

-- AddForeignKey
ALTER TABLE "numberstable" ADD CONSTRAINT "fk_numberstable_userstable" FOREIGN KEY ("user_uid") REFERENCES "userstable"("user_uid") ON DELETE NO ACTION ON UPDATE NO ACTION;

