require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initDB } = require('./src/initDatabase');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const ticketRoutes = require('./src/routes/tickets');
const authRoutes = require('./src/routes/auth');

app.use('/api/tickets', ticketRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello from Nipa Test Backend!');
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Initialize Database and Start Server
const startServer = async () => {
  try {
    // Initialize DB (Create tables if not exists)
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
