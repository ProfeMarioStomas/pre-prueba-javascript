import { Router } from 'express';
import { add, deleteAuthor, getAll, getAllById, update } from '../services/author.service.js';
import { authorValidateMiddleware } from '../middlewares/modelValidation.middleware.js';
import { validarTokenMiddleware, canDoMiddleware } from '../middlewares/tokenMiddleware.js';

const router = Router();

router.get("/", async (request, response) => {
    response.status(200).json(await getAll());
});

router.get("/:id", async (request, response) => {
    const id = parseInt(request.params.id);
    response.status(200).json(await getAllById(id));
});

router.post('/', validarTokenMiddleware, canDoMiddleware, authorValidateMiddleware, async (request, response) => {
    const body = request.body;
    const serviceResponse = await add(body);
    response.status(serviceResponse.status).json(serviceResponse.data);
});

router.put("/:id", validarTokenMiddleware, canDoMiddleware, authorValidateMiddleware, async (request, response) => {
    const id = parseInt(request.params.id);
    const body = request.body;
    const serviceResponse = await update(id, body);
    response.status(serviceResponse.status).json(serviceResponse.data);
});

router.delete("/:id", validarTokenMiddleware, canDoMiddleware, async (request, response) => {
    const id = parseInt(request.params.id);
    const serviceResponse = await deleteAuthor(id);
    response.status(serviceResponse.status).json(serviceResponse.data);
});

export default router;