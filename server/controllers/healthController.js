import mongoose from 'mongoose';

export function getHealth(req, res) {
  const dbConnected = mongoose.connection.readyState === 1;
  res.json({ status: 'ok', database: dbConnected ? 'connected' : 'not connected' });
}
