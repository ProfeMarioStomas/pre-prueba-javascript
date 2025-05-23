export const authorValidateMiddleware = (request, response, next) => {
    const { age, name } = request.body;

    if (!age) {
        return response.status(400).json({ message: "No tiene edad" });
    }

    const ageNumber = parseInt(age);
    if (isNaN(ageNumber) || ageNumber < 10 || ageNumber > 100) {
        return response.status(403).json({ message: "Edad no cumple con los requisitos" });
    }

    if (!name) {
        return response.status(400).json({ message: "No tiene nombre" });
    }

    if (name.length < 3 || name.length > 100) {
        return response.status(403).json({ message: "Nombre no cumple con los requisitos" });
    }

    next();
};

export const bookValidateMiddleware = (request, response, next) => {
    /* 
La cantidad de página debe estar entre 100 y 1000.* */
    const { isdn, name, pages, authorId, categoryId } = request.body;

    if (!isdn) {
        return response.status(400).json({ message: "No tiene isdn" });
    }

    if (isdn.length !== 8) {
        return response.status(400).json({ message: "ISDN formato incorrecto" });
    }

    if (!name) {
        return response.status(400).json({ message: "No tiene nombre" });
    }

    if (name.length < 3 || name.length > 100) {
        return response.status(400).json({ message: "Nombre largo incorrecto" });
    }

    if (!pages) {
        return response.status(400).json({ message: "No tiene páginas" });
    }

    const pagesNumber = parseInt(pages);
    if (isNaN(pagesNumber) || pagesNumber < 100 || pagesNumber > 1000) {
        return response.status(403).json({ message: "Páginas no cumple con los requisitos" });
    }

    if (!authorId) {
        return response.status(400).json({ message: "Debe agregar un autor" });
    }

    if (!categoryId) {
        return response.status(400).json({ message: "Debe agregar una categoría" });
    }

    next();
};