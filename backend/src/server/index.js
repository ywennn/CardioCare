import express from 'express';
import routes from '../routes/index.js';
import ErrorHandler from '../middleware/error.js';
import cors from 'cors';
import userAgent from 'express-useragent';
import helmet from 'helmet';
import morganStream from '../utils/morgan-stream.js';
import logger from '../utils/logger.js';
import morgan from 'morgan';
import sanitize from '../middleware/sanitize.js';
import { globalLimiter } from '../middleware/rateLimiter.js';
const app = express();

app.use(
  cors({
    origin: 'https://cardio-care-gold.vercel.app',
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
app.use(globalLimiter);
app.use(sanitize);
app.use(express.json());
app.use(userAgent.express());
app.use(routes);
app.use(ErrorHandler);
app.use(morgan('combined', { stream: morganStream }));
export default app;
