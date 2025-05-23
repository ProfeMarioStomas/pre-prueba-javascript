import { prisma } from '../prismaLunar.js';

export const getAll = async () => {
    return await prisma.book.findMany({
        select: {
            author: true,
            category: true,
            isdn: true,
            name: true,
            pages: true,
        }
    });
};

export const getAllById = async (id) => {
    return await prisma.author.findUnique({
        select: {
            author: true,
            category: true,
            isdn: true,
            name: true,
            pages: true,
        }
    }, {
        where: {
            id
        }
    });
};

export const add = async (data) => {
    try {
        const bookCreated = await prisma.book.create({
            data
        });
        return {
            status: 200,
            data: bookCreated
        };
    } catch (error) {
        console.log('Error en book:add', error.message);
        return {
            status: 500,
            data: "Error al crear"
        }
    }
};

export const update = async (id, data) => {
    try {
        // EXISTE
        const bookExists = await prisma.book.findUnique({ where: { id } });
        if (bookExists) {
            const bookUpdated = await prisma.book.update({
                where: { id },
                data
            });
            return {
                status: 200,
                data: bookUpdated
            }
        } else {
            return {
                status: 404,
                data: "Libro no se encuentra por ID"
            }
        }
    } catch (error) {
        console.log('Error en book:update', error.message);
        return {
            status: 500,
            data: "Error al crear"
        }
    }
};

export const deleteBook = async (id) => {
    try {
        // EXISTE?
        const bookExists = await prisma.book.findUnique({ where: { id } });
        if (bookExists) {
            // ELIMINAR
            const bookDeleted = await prisma.author.delete({ where: { id } });
            return {
                status: 200,
                data: bookDeleted
            };
        } else {
            return {
                status: 404,
                data: "Libro no se encuentra por ID"
            }
        }
    } catch (error) {
        console.log('Error en author:deleteBook', error.message);
        return {
            status: 500,
            data: "Error al crear"
        }
    }
};