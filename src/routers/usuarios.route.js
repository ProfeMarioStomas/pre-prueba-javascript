// Este archivo maneja las rutas relacionadas con usuarios, como el inicio de sesión

// Importamos las herramientas necesarias:
// Router: permite crear rutas para nuestra aplicación web
// jwt: nos ayuda a crear "tickets de acceso" (tokens) para los usuarios
import { Router } from 'express';
import jwt from "jsonwebtoken";

// Creamos un nuevo router (manejador de rutas)
const router = Router();

// Esta ruta se encarga del proceso de inicio de sesión
router.post('/login', async (req, res) => {
    // Obtenemos el RUT que el usuario envió en su solicitud
    const { rut } = req.body;

    // Verificamos que el RUT sea válido (que exista y sea un número)
    if (!rut || isNaN(parseInt(rut))) {
        // Si el RUT no es válido, enviamos un mensaje de error
        return res.status(400).json({ error: "RUT inválido" });
    }

    // Determinamos el tipo de usuario según si su RUT es par o impar
    // Si es par: será un usuario del sistema (SystemUser)
    // Si es impar: será un cliente del sistema (SystemClient)
    const esPar = parseInt(rut) % 2 === 0;

    // Creamos un usuario de ejemplo con la información básica
    // En un sistema real, esta información vendría de una base de datos
    const usuarioSimulado = {
        rut,
        nombre: "Mario",
        apellido: "Cares",
        userTypeId: {
            id: esPar ? 1 : 2,
            description: esPar ? "SystemUser" : "SystemClient"
        }
    };

    try {
        // Generamos un "ticket de acceso" (token) que contiene la información del usuario
        // Este token se usará para identificar al usuario en futuras solicitudes
        // process.env.CLAVE_JWT es una clave secreta guardada en las variables de entorno
        // El token expirará después de 10 horas
        const token = jwt.sign(
            usuarioSimulado,
            process.env.CLAVE_JWT,
            { expiresIn: '10h' }
        );
        // Enviamos el token al usuario para que pueda usarlo
        res.status(200).json({ token });
    } catch (error) {
        // Si ocurre algún error al generar el token, enviamos un mensaje de error
        res.status(500).json({ error: "Error generando el token" });
    }
});

// Exportamos el router para que pueda ser usado en otras partes de la aplicación
export default router;
