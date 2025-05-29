// Este archivo configura un servidor web usando Express (una herramienta para crear servidores web)

// Importamos las herramientas necesarias
import express from 'express';
// Importamos las rutas definidas para manejar usuarios
import userRouter from "../src/routers/users.route.js";

// Creamos una nueva aplicación de servidor
const app = express();

// Configuramos el servidor para que pueda entender datos en formato JSON
app.use(express.json());

// Conectamos todas las funcionalidades de usuarios bajo la ruta '/usuarios'
// Por ejemplo: '/usuarios/registrar', '/usuarios/login', etc.
app.use('/usuarios', userRouter);

// Definimos qué debe hacer el servidor cuando alguien visita la página principal ('/')
// En este caso, solo envía un mensaje confirmando que el servicio funciona
app.get('/', (request, response) => {
    response.send("Servicio funcionando correctamente");
});

// Exportamos la aplicación para que pueda ser utilizada en otros archivos
export default app;