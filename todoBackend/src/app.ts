import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import exampleRoute from './routes/exampleRoute';
import noteRoutes from './routes/noteRoutes';

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/example', exampleRoute);
app.use('/api/notes', noteRoutes);

export default app;
