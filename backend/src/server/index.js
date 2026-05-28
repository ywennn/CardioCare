import express from 'express';
import routes from '../routes/index.js';
import ErrorHandler from '../middleware/error.js';
import cors from 'cors';
import userAgent from 'express-useragent';
import helmet from 'helmet';
const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    contentSecurityPolicy: false,
  }),
);
app.use(express.json());
app.use(userAgent.express());
app.use(routes);
app.use(ErrorHandler);

export default app;
