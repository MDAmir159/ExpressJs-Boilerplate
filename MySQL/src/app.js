const express = require('express');
const cors = require('cors');
const app = express();
const apis = require('./app/routes/allRoutes');
const globalErrorHandler = require('./app/middlewares/globalErrorHandler');
var cron = require('node-cron');
const { killOtherProcesses } = require('./helpers/Promise/PromiseModule');

// cron.schedule('*/5 * * * * *', async () => {
//   await killOtherProcesses();
// });
console.log("env", process.env.NODE_ENV);

app.use(require('express-status-monitor')())

app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  exposedHeaders: 'Authorization,Content-Range,X-Content-Range',
};

app.use(cors(corsOptions));

app.use(express.json({ limit: "100mb" }));

app.use(apis);

// global error handler
app.use(globalErrorHandler);

//if any route not match
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Error handling middleware to handle all errors
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    errorMessages: [
      { path: req.originalUrl, message: 'API Not Found', }
    ]
  });
  next();
});

module.exports = app;