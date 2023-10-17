const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB_PROD = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB_PROD, {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true
  })
  .then(() => {
    console.log('Connected to MongoDB');
  });

// .catch((err) => console.log('Error')); [one way of handling rejected promise]

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// catching unhandled Rejection across the application
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('Unhandled Rejection 💣 Shutting Down...');
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('✋ SIGTERM RECEIVED, Shutting down gracefully ');
  server.close(() => {
    process.exit(1);
  });
  console.log('💣 Process Terminated !');
});
