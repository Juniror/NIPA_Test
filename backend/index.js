
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import initDB from './src/initDatabase.js';

const app = express();
const port = process.env.PORT;

import ticketRoutes from './src/routes/tickets.js';
import authRoutes from './src/routes/auth.js';

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
