import { prisma } from '../prismaLunar.js';

export const getAll = async () => {
    return await prisma.author.findMany({
        select: {
            name: true,
            age: true,
            books: true
        }
    });
};

export const getAllById = async (id) => {
    return await prisma.author.findUnique({
        select: {
            name: true,
            age: true,
            books: true
        }
    }, {
        where: {
            id
        }
    });
};

export const add = async (data) => {
    try {
        const authorCreated = await prisma.author.create({
            data
        });
        return {
            status: 200,
            data: authorCreated
        };
    } catch (error) {
        console.log('Error en author:add', error.message);
        return {
            status: 500,
            data: "Error al crear"
        }
    }
};

export const update = async (id, data) => {
    try {
        // EXISTE
        const authorExists = await prisma.author.findUnique({ where: { id } });
        if (authorExists) {
            const authorUpdated = await prisma.author.update({
                where: { id },
                data
            });
            return {
                status: 200,
                data: authorUpdated
            }
        } else {
            return {
                status: 404,
                data: "Author no se encuentra por ID"
            }
        }
    } catch (error) {
        console.log('Error en author:update', error.message);
        return {
            status: 500,
            data: "Error al crear"
        }
    }
};

export const deleteAuthor = async (id) => {
    try {
        // EXISTE?
        const authorExists = await prisma.author.findUnique({ where: { id } });
        if (authorExists) {
            // ELIMINAR
            const authorDeleted = await prisma.author.delete({ where: { id } });
            return {
                status: 200,
                data: authorDeleted
            };
        } else {
            return {
                status: 404,
                data: "Author no se encuentra por ID"
            }
        }
    } catch (error) {
        console.log('Error en author:deleteAuthor', error.message);
        return {
            status: 500,
            data: "Error al crear"
        }
    }
};