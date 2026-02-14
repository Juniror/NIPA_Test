
const express = require('express');
const cors = require('cors');
const initDB = require('./src/initDatabase');

const app = express();
const port = process.env.PORT;

const ticketRoutes = require('./src/routes/tickets');
const authRoutes = require('./src/routes/auth');

app.use(cors());
app.use(express.json());

app.use('/api/tickets', ticketRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('<h1>Hello from the backend - API is working!</h1>');
});


const startServer = async () => {
  try {
    await initDB();

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      console.log(`DB Host: ${process.env.DB_HOST}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
