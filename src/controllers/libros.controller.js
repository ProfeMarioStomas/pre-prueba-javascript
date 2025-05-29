import { prisma } from "../utils/prismaLunar.js";

/**
 * Obtiene todos los libros junto con su autor y categoría asociados.
 * 
 * Explicación para no programadores:
 * Esta función recupera todos los libros de la base de datos.
 * Para cada libro, también incluye información sobre su autor y categoría.
 * Finalmente, envía todos estos datos al usuario en formato JSON.
 */
export const obtenerLibros = async (req, res) => {
  // Busca todos los libros en la base de datos e incluye los datos del autor y categoría
  const libros = await prisma.book.findMany({ include: { author: true, category: true } });
  // Envía la lista de libros como respuesta
  res.json(libros);
};

/**
 * Obtiene un libro por su ISDN.
 * 
 * Explicación para no programadores:
 * Esta función busca un único libro usando su código ISDN (como un DNI para libros).
 * Si encuentra el libro, devuelve sus datos junto con la información del autor y categoría.
 * Si no lo encuentra, envía un mensaje de error.
 */
export const obtenerLibroPorIsdn = async (req, res) => {
  // Busca un libro específico por su ISDN e incluye datos del autor y categoría
  const libro = await prisma.book.findUnique({
    where: { isdn: req.params.isdn },
    include: { author: true, category: true }
  });
  // Si encuentra el libro lo envía, si no, envía un mensaje de error
  libro ? res.json(libro) : res.status(404).json({ error: 'No encontrado' });
};

/**
 * Obtiene libros filtrados por categoría.
 * 
 * Explicación para no programadores:
 * Esta función recupera todos los libros que pertenecen a una categoría específica.
 * La categoría se identifica mediante un número ID.
 * Para cada libro encontrado, incluye información sobre su autor y categoría.
 */
export const obtenerLibrosPorCategoria = async (req, res) => {
  // Convierte el ID de categoría a número
  const categoriaId = parseInt(req.params.categoryId);
  // Busca todos los libros que pertenecen a esa categoría
  const libros = await prisma.book.findMany({
    where: { categoryId: categoriaId },
    include: { author: true, category: true }
  });
  // Envía la lista de libros filtrados como respuesta
  res.json(libros);
};

/**
 * Crea un nuevo libro con los datos proporcionados.
 * 
 * Explicación para no programadores:
 * Esta función añade un nuevo libro a la base de datos.
 * Toma toda la información necesaria del libro (como título, autor, etc.) y crea un registro nuevo.
 * Cuando termina, devuelve los datos del libro creado y un código 201 que significa "creado con éxito".
 */
export const crearLibro = async (req, res) => {
  // Crea un nuevo libro usando los datos enviados en la petición
  const libro = await prisma.book.create({ data: req.body });
  // Responde con el libro creado y un código de estado 201 (Creado)
  res.status(201).json(libro);
};

/**
 * Actualiza los datos de un libro por su ISDN.
 * 
 * Explicación para no programadores:
 * Esta función modifica la información de un libro existente.
 * Identifica el libro mediante su código ISDN y actualiza sus datos con la nueva información.
 * Al finalizar, devuelve los datos actualizados del libro.
 */
export const actualizarLibro = async (req, res) => {
  // Actualiza un libro específico por su ISDN con los nuevos datos
  const libro = await prisma.book.update({
    where: { isdn: req.params.isdn },
    data: req.body
  });
  // Envía el libro actualizado como respuesta
  res.json(libro);
};

/**
 * Elimina un libro por su ISDN.
 * 
 * Explicación para no programadores:
 * Esta función borra un libro de la base de datos.
 * Identifica el libro que se debe eliminar mediante su código ISDN.
 * Después de eliminar el libro, envía una respuesta con código 204, que significa 
 * "Operación exitosa, no hay contenido para mostrar".
 */
export const eliminarLibro = async (req, res) => {
  // Elimina un libro específico por su ISDN
  await prisma.book.delete({ where: { isdn: req.params.isdn } });
  // Envía una respuesta sin contenido con código 204 (Sin Contenido)
  res.status(204).send();
};
