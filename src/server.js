// Este archivo es el punto de entrada del servidor web

// Carga las variables de entorno del archivo .env
// (Las variables de entorno son configuraciones guardadas fuera del código)
import 'dotenv/config';

// Importa la aplicación web que definimos en el archivo app.js
import app from './app.js';

// Define el puerto en el que funcionará el servidor
// Si hay un puerto definido en las variables de entorno, usa ese
// Si no, usa el puerto 3000 como valor predeterminado
const PORT = process.env.PORT || 3000;

// Inicia el servidor web para que escuche peticiones en el puerto especificado
app.listen(PORT, () => {
    // Muestra un mensaje en la consola cuando el servidor ha iniciado correctamente
    // La dirección http://localhost:PORT es donde podrás ver la aplicación funcionando
    console.log('Iniciando servidor en: http://localhost:' + PORT);
});