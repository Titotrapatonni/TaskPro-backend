const express = require('express');
const swaggerUi = require('swagger-ui-express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const authRouter = require('./routes/api/authRoutes');
const boardsRouter = require('./routes/api/boardsRouter');
const taskRouter = require('./routes/api/tasksRouter');
const helperRouter = require('./routes/api/helpRouter');
const columnsRouter = require('./routes/api/columnsRouter');
const backgroundRouter = require('./routes/api/backgroundRouter');
const swaggerDocument = require('./swagger.json');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/users', authRouter);
app.use('/api/boards', boardsRouter);
app.use('/api/columns', columnsRouter);
app.use('/api/help', helperRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/backgrounds', backgroundRouter);

app.use((_, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, _, res, __) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
