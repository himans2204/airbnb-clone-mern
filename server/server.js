import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  const dbConnected = mongoose.connection.readyState === 1;
  res.json({ status: 'ok', database: dbConnected ? 'connected' : 'not connected' });
});

const PORT = process.env.PORT || 5001;

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('Could not connect to MongoDB:', error.message);
    process.exit(1);
  }
}

startServer();
