# Pre Prueba Programación Web

Desarrollar API REST utilizando Node.js con Express que permita gestionar Bandas, Discos y Categorías de Música.

## Discos
Tienen un
- ID (es el ID, no es autoincremental)
- Nombre
- Duración
- Categoría
- Banda

## Banda
Tienen un
- Identificador (autoincremental)
- Nombre

## Categorías
Tienen un
- Identificador (autoincremental)
- Descripción

# Endpoints
Debe implementar rutas CRUD para cada modelo, las cuales son:
- Listar Discos: Todos, por ID, por categoría.
- Listar Bandas: Todos, por ID.
- Agregar Discos
- Agregar Bandas
- Actualizar Discos
- Actualizar Bandas
- Eliminar Discos
- Eliminar Bandas

En el caso de listar discos, debe agregar el autor del mismo.
En el caso de listar bandas, debe agregar los discos que lanzado.

# Restricciones
Para la evaluación, se utilizarán 2 usuario de prueba, simulando que existen en una base de datos de usuarios.
Existen 2 tipos de usuarios: Clientes y Usuarios de Sistema.

Los Clientes únicamente podrán listar Discos y Bandas, mientras que los Usuarios de Sistema pueden realizar cualquier acción.

Lo anterior, debe validarlo en base a JWT. Se entregará el usuario y contraseña para obtener un Token específico a cada rol, el cual deberá validar decodificando el mismo en jwt.io y ver su estuctura.

# Middlewares
- Debe agregar un middleware que valide el token para las peticiones que DEBEN restringirse.
- Debe agregar un middleware que valide el ingreso de información al guardar un nuevo disco y una nueva Banda.

# Validaciones
## Discos
- Para los discos, todos los campos son requeridos.
- El id debe tener 8 caracteres.
- El nombre debe tener un mínino de 3 caracteres y un máximo de 100.
- La duración debe estar entre 100 y 1000.
- Debe traer un ID de categoría válido.
- Debe traer un ID de banda autor válido.
- Un ID válido se entiende por un registro que ya exista en la base de datos. No puedo agregar un disco si la banda con ID 4 (por ejemplo), no existe.

## Bandas
- Para las bandas, todos los campos son requeridos.
- El nombre es requerido.
- El nombre debe tener un mínimo de 20 caracteres y un máximo de 100.

# Código base
Se entregará el archivo schema.prisma para realizar la migración, además de un seed para precargar las categorías de libros.
