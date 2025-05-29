import { prisma } from "../utils/prismaLunar.js";

/**
 * Obtiene todos los autores junto con sus libros asociados.
 * 
 * Esta función consulta la base de datos para traer la lista completa de autores.
 * Para cada autor, también incluye todos los libros que ha escrito.
 * Cuando un usuario visita la página de autores, esta función proporciona los datos.
 */
export const obtenerAutores = async (req, res) => {
  const autores = await prisma.author.findMany({ include: { books: true } });
  res.json(autores);
};

/**
 * Obtiene un autor específico por su ID.
 * 
 * Esta función busca a un solo autor usando su número identificador único (ID).
 * También trae todos los libros escritos por ese autor específico.
 * Si el autor existe, devuelve sus datos; si no, muestra un mensaje de error.
 * Se usa cuando un usuario quiere ver la información detallada de un autor.
 */
export const obtenerAutorPorId = async (req, res) => {
  const autor = await prisma.author.findUnique({
    where: { id: parseInt(req.params.id) },
    include: { books: true }
  });
  autor ? res.json(autor) : res.status(404).json({ error: 'No encontrado' });
};

/**
 * Crea un nuevo autor con los datos enviados en el cuerpo de la solicitud.
 * 
 * Esta función añade un nuevo autor a la base de datos.
 * Los datos como nombre, biografía, etc. se envían desde un formulario.
 * Una vez creado, devuelve la información del nuevo autor con su ID asignado.
 * Se utiliza cuando se quiere registrar a un nuevo autor en el sistema.
 */
export const crearAutor = async (req, res) => {
  const autor = await prisma.author.create({ data: req.body });
  res.status(201).json(autor);
};

/**
 * Actualiza un autor existente por su ID.
 * 
 * Esta función modifica los datos de un autor que ya existe en la base de datos.
 * Primero lo identifica por su ID y luego actualiza sus datos con la nueva información.
 * Devuelve los datos actualizados del autor.
 * Se usa cuando se necesita corregir o cambiar información de un autor.
 */
export const actualizarAutor = async (req, res) => {
  const autor = await prisma.author.update({
    where: { id: parseInt(req.params.id) },
    data: req.body
  });
  res.json(autor);
};

/**
 * Elimina un autor por su ID.
 * 
 * Esta función borra completamente a un autor de la base de datos usando su ID.
 * Una vez eliminado, no se devuelve ningún contenido, solo una confirmación.
 * Se utiliza cuando un autor ya no debe aparecer en el sistema.
 * Es importante notar que esto podría afectar a los libros asociados al autor.
 */
export const eliminarAutor = async (req, res) => {
  await prisma.author.delete({ where: { id: parseInt(req.params.id) } });
  res.status(204).send();
};
