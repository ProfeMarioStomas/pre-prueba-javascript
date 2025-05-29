import jwt from 'jsonwebtoken';

/**
 * Middleware para autenticar al usuario mediante JWT.
 */
/**
 * Middleware para autenticar usuarios mediante tokens JWT.
 * 
 * Esta función verifica si el usuario está autorizado para acceder a rutas protegidas.
 * Funciona de la siguiente manera:
 * 1. Extrae el token de autenticación del encabezado 'Authorization' de la solicitud
 * 2. Comprueba si existe un token (si no existe, devuelve error 401 - No autorizado)
 * 3. Verifica si el token es válido usando la clave secreta almacenada en variables de entorno
 * 4. Si el token es inválido, devuelve error 403 - Prohibido
 * 5. Si el token es válido, añade la información del usuario a la solicitud y permite continuar
 * 
 * @param {Object} req - Objeto de solicitud HTTP que contiene los datos enviados por el cliente
 * @param {Object} res - Objeto de respuesta HTTP usado para responder al cliente
 * @param {Function} next - Función que permite pasar al siguiente middleware o controlador
 * @returns {void} No devuelve valor, pero puede enviar respuestas de error o continuar el procesamiento
 */
export function autenticarToken(req, res, next) {
  const encabezadoAutorizacion = req.headers['authorization'];
  const token = encabezadoAutorizacion?.split(' ')[1];

  if (!token) return res.sendStatus(401); // No autorizado

  jwt.verify(token, process.env.CLAVE_JWT, (error, usuario) => {
    if (error) return res.sendStatus(403); // Prohibido
    req.user = usuario;
    next();
  });
}

/**
 * Middleware para autorizar solo a usuarios del sistema (SystemUser).
 */
export function autorizarUsuarioSistema(req, res, next) {
  if (req.user.userTypeId.description !== 'SystemUser') {
    return res.status(403).json({ error: 'No tienes permisos para esta acción' });
  }
  next();
}
