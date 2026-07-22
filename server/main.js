// CodeSync Server - Entry Point
import express from 'express';
import http from 'http';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';

import { corsOptions } from './src/config/corsOptions.js';
import { initSocketServer } from './src/socket/socketManager.js';
import { errorHandler, notFoundHandler } from './src/middleware/errorHandler.js';
import roomRoutes from './src/routes/roomRoutes.js';

// ==================== APP SETUP ====================
const app = express();
const server = http.createServer(app);

// ==================== MIDDLEWARE ====================
app.use(cors(corsOptions));
app.use(express.json({ limit: '5mb' }));
app.use(morgan('dev'));

// ==================== ROUTES ====================
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🚀 CodeSync server is running!',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
  });
});

app.use('/api/rooms', roomRoutes);

// ==================== ERROR HANDLERS ====================
app.use(notFoundHandler);
app.use(errorHandler);

// ==================== SOCKET.IO ====================
initSocketServer(server);

// ==================== START SERVER ====================
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log('');
  console.log('════════════════════════════════════════');
  console.log('  🚀 CodeSync Server Running');
  console.log('════════════════════════════════════════');
  console.log(`  📡 Port     : ${PORT}`);
  console.log(`  🌍 Env      : ${process.env.NODE_ENV || 'development'}`);
  console.log(`  🔗 URL      : http://localhost:${PORT}`);
  console.log('════════════════════════════════════════');
  console.log('');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});