import express from 'express';
import routes from '../routes/index.js';
import ErrorHandler from '../middleware/error.js';
import userAgent from 'express-useragent';
const app = express();

app.use(express.json());
app.use(userAgent.express());
app.use(routes);
app.use(ErrorHandler);

export default app;
