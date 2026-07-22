// CORS configuration for Express and Socket.io
import 'dotenv/config';

// Allowed origins (add your production URLs here)
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.CLIENT_URL,
].filter(Boolean); // Remove undefined values

export const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (Postman, curl, mobile apps)
    if (!origin) return callback(null, true);

    if (allowedOrigins.some((allowed) => origin.startsWith(allowed))) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked origin: ${origin}`);
      callback(null, true); // Allow anyway for now (loose CORS for demo)
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

export const socketCorsOptions = {
  origin: '*', // Allow all origins for socket.io (or use specific ones)
  credentials: true,
  methods: ['GET', 'POST'],
};