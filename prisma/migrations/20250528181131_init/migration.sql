/*
  Warnings:

  - You are about to drop the `author` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `book` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `book` DROP FOREIGN KEY `Book_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `book` DROP FOREIGN KEY `Book_categoryId_fkey`;

-- DropTable
DROP TABLE `author`;

-- DropTable
DROP TABLE `book`;

-- DropTable
DROP TABLE `category`;

-- CreateTable
CREATE TABLE `Libro` (
    `isdn` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `paginas` INTEGER NOT NULL,
    `categoriaId` INTEGER NOT NULL,
    `autorId` INTEGER NOT NULL,

    PRIMARY KEY (`isdn`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Autor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `edad` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Categoria_descripcion_key`(`descripcion`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Libro` ADD CONSTRAINT `Libro_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `Categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Libro` ADD CONSTRAINT `Libro_autorId_fkey` FOREIGN KEY (`autorId`) REFERENCES `Autor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
