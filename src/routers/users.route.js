// Este archivo maneja las rutas relacionadas con usuarios, específicamente el inicio de sesión

// Importamos las herramientas necesarias
import { Router } from 'express';   // Router nos permite crear rutas (URLs) para nuestra aplicación
import jwt from "jsonwebtoken";     // jwt nos permite crear "tokens" (identificaciones digitales seguras)

// Creamos un nuevo manejador de rutas
const router = Router();

// Definimos lo que sucede cuando alguien intenta iniciar sesión (URL: /login)
router.post('/login', async (request, response) => {
    // NOTA: Esto es un MOCK (datos de prueba), no es una validación real de contraseña
    // SystemUser puede crear, actualizar o eliminar información
    
    // Obtenemos los datos que envió el usuario
    const data = request.body;
    
    // Creamos un usuario ficticio para simular un inicio de sesión
    // En un sistema real, estos datos vendrían de una base de datos
    const userMock = {
        rut: data.rut,   // RUT es el número de identificación chileno
        name: "Mario",   // Nombre fijo para el ejemplo
        lastName: "Cares", // Apellido fijo para el ejemplo
        userTypeId: {
            // Determinamos el tipo de usuario según si su RUT es par o impar
            id: (parseInt(data.rut) % 2 === 0) ? 1 : 2,
            description: (parseInt(data.rut) % 2 === 0) ? "SystemUser" : "SystemClient"
        }
    }
    
    // Creamos un token de seguridad (como una credencial digital temporal)
    const token = jwt.sign(
        userMock,               // Datos del usuario que guardamos en el token
        process.env.CLAVE_JWT,  // Clave secreta para firmar el token
        { expiresIn: '10h' }    // El token será válido por 10 horas
    );
    
    // Respondemos al usuario con el token generado
    response.status(200).json({ token });
});

// Exportamos el router para usarlo en otras partes de la aplicación
export default router;