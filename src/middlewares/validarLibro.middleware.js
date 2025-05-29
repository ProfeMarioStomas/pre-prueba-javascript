/**
 * Middleware para validar los datos de un libro antes de crearlo o actualizarlo en la base de datos.
 * 
 * Este middleware verifica que todos los datos necesarios para un libro estén presentes y sean válidos:
 * 
 * @param {Object} req - La solicitud HTTP que contiene los datos del libro en req.body
 * @param {Object} req.body - Contiene los datos del libro a validar
 * @param {string} req.body.isdn - Código identificador único del libro (debe tener exactamente 8 caracteres)
 * @param {string} req.body.name - Título del libro (debe tener entre 3 y 100 caracteres)
 * @param {number} req.body.pages - Número de páginas del libro (debe estar entre 100 y 1000)
 * @param {number} req.body.categoryId - Identificador de la categoría a la que pertenece el libro
 * @param {number} req.body.authorId - Identificador del autor del libro
 * 
 * @param {Object} res - Objeto de respuesta HTTP usado para devolver errores si la validación falla
 * 
 * @param {Function} next - Función que se llama cuando la validación es exitosa para continuar
 *                          con el siguiente paso en el procesamiento de la solicitud
 * 
 * El proceso de validación sigue estos pasos:
 * 1. Verifica que todos los campos requeridos estén presentes
 * 2. Comprueba que el ISDN tenga exactamente 8 caracteres
 * 3. Verifica que el título tenga una longitud apropiada (entre 3 y 100 caracteres)
 * 4. Comprueba que el número de páginas sea razonable (entre 100 y 1000)
 * 5. Confirma que la categoría indicada exista realmente en la base de datos
 * 6. Confirma que el autor indicado exista realmente en la base de datos
 * 
 * Si alguna validación falla, la función responde con un mensaje de error y código 400.
 * Si todas las validaciones son exitosas, la función llama a 'next()' para continuar.
 */
import { prisma } from "../utils/prismaLunar.js";

/**
 * Middleware para validar los datos de un libro antes de crearlo o actualizarlo.
 */
export async function validarLibro(req, res, next) {
  const { isdn, name, pages, categoryId, authorId } = req.body;

  if (!isdn || !name || !pages || !categoryId || !authorId)
    return res.status(400).json({ error: 'Todos los campos son requeridos' });

  if (isdn.length !== 8)
    return res.status(400).json({ error: 'ISDN debe tener 8 caracteres' });

  if (name.length < 3 || name.length > 100)
    return res.status(400).json({ error: 'Nombre debe tener entre 3 y 100 caracteres' });

  if (pages < 100 || pages > 1000)
    return res.status(400).json({ error: 'Páginas debe estar entre 100 y 1000' });

  // Validar existencia de la categoría
  const categoria = await prisma.category.findUnique({ where: { id: categoryId } });
  if (!categoria)
    return res.status(400).json({ error: 'Categoría inválida' });

  // Validar existencia del autor
  const autor = await prisma.author.findUnique({ where: { id: authorId } });
  if (!autor)
    return res.status(400).json({ error: 'Autor inválido' });

  next();
}
