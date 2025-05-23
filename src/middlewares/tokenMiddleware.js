export const validarTokenMiddleware = (request, response, next) => {
    const autorizationToken = request.headers.authorization;

    if (!autorizationToken) {
        return response.status(401).json({ message: "Debe iniciar sesión" });
    }

    const token = autorizationToken.replace('Bearer ', '');

    try {
        const payload = jwt.verify(token, process.env.CLAVE_JWT);
        request.payload = payload;
        next();
    } catch (error) {
        response.status(401).json({ message: "Token inválido" });
    }
}

export const canDoMiddleware = (request, response, next) => {
    const payload = request.payload;
    if (payload.userTypeId.id === 1) {
        next();
    }
    response.status(403).json({ message: "No tiene permiso para borrar" });
}