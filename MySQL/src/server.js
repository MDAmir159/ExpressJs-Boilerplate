const app = require('./app');
const { PORT } = require('./config');
const pool = require('./config/databaseConfig');

const port = PORT || 5000;

const startServer = async () => {
  try {
    const connectionPool = await pool();
    const connection = await connectionPool.getConnection();
    console.log('Connected to MySQL as port ' + connection.config.port);

    // Release the connection back to the pool
    connection.release();
    app.listen(port, () => {
      console.log('Server listening to port ', port);
    });

  } catch (error) {
    process.exit(1);
  }
}
startServer();
