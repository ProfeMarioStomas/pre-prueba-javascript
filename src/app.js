import express from 'express';
import { authorRouter, userRouter, bookRouter } from "../src/routers/index.js";

const app = express();

app.use(express.json());

app.use('/usuarios', userRouter);
app.use('/libros', bookRouter);
app.use('/autores', authorRouter);

app.get('/', (request, response) => {
    response.send("Servicio funcionando correctamente");
});

export default app;