// Este archivo define las rutas (URLs) para manejar las operaciones relacionadas con libros en la aplicación

// Importamos herramientas necesarias para crear las rutas
import { Router } from 'express';

// Importamos las funciones que contienen la lógica para cada operación con libros
import {
  obtenerLibros,            // Función para obtener todos los libros
  obtenerLibroPorIsdn,      // Función para buscar un libro específico por su código ISDN
  obtenerLibrosPorCategoria, // Función para obtener libros filtrados por categoría
  crearLibro,               // Función para añadir un nuevo libro
  actualizarLibro,          // Función para modificar información de un libro existente
  eliminarLibro             // Función para eliminar un libro
} from '../controllers/libros.controller.js';

// Importamos funciones para verificar que el usuario tenga permiso para usar estas operaciones
import {
  autenticarToken,          // Verifica que el usuario haya iniciado sesión correctamente
  autorizarUsuarioSistema   // Verifica que el usuario tenga permisos de administrador
} from '../middlewares/autenticacion.middleware.js';

// Importamos función para verificar que los datos del libro sean correctos
import { validarLibro } from '../middlewares/validarLibro.middleware.js';

// Creamos el enrutador que manejará todas las rutas relacionadas con libros
const router = Router();

// DEFINICIÓN DE RUTAS:

// Ruta para obtener la lista completa de todos los libros
// URL: /libros/ (método GET)
router.get('/', autenticarToken, obtenerLibros);

// Ruta para buscar y obtener un libro específico usando su código ISDN
// URL: /libros/[número-isdn] (método GET)
router.get('/:isdn', autenticarToken, obtenerLibroPorIsdn);

// Ruta para obtener todos los libros que pertenecen a una categoría específica
// URL: /libros/categoria/[id-de-categoría] (método GET)
router.get('/categoria/:categoryId', autenticarToken, obtenerLibrosPorCategoria);

// Ruta para crear un nuevo libro en el sistema
// URL: /libros/ (método POST)
// Requiere: autenticación, permisos de administrador y datos válidos del libro
router.post('/', autenticarToken, autorizarUsuarioSistema, validarLibro, crearLibro);

// Ruta para actualizar la información de un libro existente
// URL: /libros/[número-isdn] (método PUT)
// Requiere: autenticación, permisos de administrador y datos válidos del libro
router.put('/:isdn', autenticarToken, autorizarUsuarioSistema, validarLibro, actualizarLibro);

// Ruta para eliminar permanentemente un libro del sistema
// URL: /libros/[número-isdn] (método DELETE)
// Requiere: autenticación y permisos de administrador
router.delete('/:isdn', autenticarToken, autorizarUsuarioSistema, eliminarLibro);

// Exportamos el enrutador para que pueda ser utilizado en la aplicación principal
export default router;
