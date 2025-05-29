/**
 * Archivo de rutas para gestionar autores
 * Este archivo define las diferentes operaciones que se pueden realizar con los autores
 * (consultar, crear, modificar, eliminar) y establece quién puede realizar cada operación.
 */

import { Router } from 'express'; // Importa la funcionalidad para crear rutas
import {
  obtenerAutores, // Función para obtener la lista de todos los autores
  obtenerAutorPorId, // Función para obtener un autor específico usando su ID
  crearAutor, // Función para crear un nuevo autor
  actualizarAutor, // Función para modificar datos de un autor existente
  eliminarAutor // Función para eliminar un autor de la base de datos
} from '../controllers/autores.controller.js';
import {
  autenticarToken, // Verifica que el usuario esté conectado (con sesión iniciada)
  autorizarUsuarioSistema // Verifica que el usuario tenga permisos de administrador
} from '../middlewares/autenticacion.middleware.js';
import { validarAutor } from '../middlewares/validarAutor.middleware.js'; // Verifica que los datos del autor sean correctos

const router = Router(); // Crea un nuevo objeto para manejar las rutas

// DEFINICIÓN DE RUTAS:

// Ruta para obtener todos los autores
// Cualquier usuario conectado puede ver la lista de autores
router.get('/', autenticarToken, obtenerAutores);

// Ruta para obtener información de un autor específico por su ID
// Cualquier usuario conectado puede ver la información de un autor
router.get('/:id', autenticarToken, obtenerAutorPorId);

// Ruta para crear un nuevo autor
// Solo usuarios administradores pueden crear autores nuevos
// Se validan los datos antes de crear el autor
router.post('/', autenticarToken, autorizarUsuarioSistema, validarAutor, crearAutor);

// Ruta para actualizar los datos de un autor existente
// Solo usuarios administradores pueden modificar autores
// Se validan los datos antes de actualizar el autor
router.put('/:id', autenticarToken, autorizarUsuarioSistema, validarAutor, actualizarAutor);

// Ruta para eliminar un autor
// Solo usuarios administradores pueden eliminar autores
router.delete('/:id', autenticarToken, autorizarUsuarioSistema, eliminarAutor);

export default router; // Exporta todas las rutas definidas para que puedan ser usadas en la aplicación
