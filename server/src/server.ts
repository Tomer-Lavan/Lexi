// server.ts
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { conversationsRouter } from './routers/conversationsRouter.router.';
import { dataAggregationRouter } from './routers/dataAggregationRouter.router';
import { experimentsRouter } from './routers/experimentsRouter.router';
import { modelsRouter } from './routers/modelsRouter.router';
import { usersRouter } from './routers/usersRouter.router';

dotenv.config();
const app = express();
app.use(bodyParser.json());
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());

const PORT = process.env.PORT || 5000;
app.use('/conversations', conversationsRouter());
app.use('/experiments', experimentsRouter());
app.use('/users', usersRouter());
app.use('/models', modelsRouter());
app.use('/dataAggregation', dataAggregationRouter());

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
