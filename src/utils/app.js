// app.js
import express from 'express';

// Importamos las rutas en español
import rutaUsuarios from '../routers/usuarios.route.js';
import rutaAutores from '../routers/autores.route.js';
import rutaLibros from '../routers/libros.route.js';

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Definición de rutas principales
app.use('/usuarios', rutaUsuarios);
app.use('/libros', rutaLibros);
app.use('/autores', rutaAutores);

// Ruta raíz de prueba
app.get('/', (req, res) => {
  res.send('Servicio funcionando correctamente');
});

export default app;
