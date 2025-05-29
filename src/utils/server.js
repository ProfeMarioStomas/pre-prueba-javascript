// server.js
import 'dotenv/config';
import app from './app.js';

// Puerto desde variables de entorno o por defecto
const PUERTO = process.env.PORT || 3000;

// Iniciamos el servidor
app.listen(PUERTO, () => {
    console.log('Iniciando servidor en: http://localhost:' + PUERTO);
});
