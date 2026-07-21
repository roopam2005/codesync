// Optional REST routes for room info
import express from 'express';
import roomStore from '../store/roomStore.js';

const router = express.Router();

// Get server stats
router.get('/stats', (req, res) => {
  res.json({
    success: true,
    data: roomStore.getStats(),
  });
});

// Get info about a specific room (without exposing code)
router.get('/:roomId', (req, res) => {
  const { roomId } = req.params;
  const room = roomStore.getRoom(roomId);

  if (!room) {
    return res.status(404).json({
      success: false,
      error: 'Room not found',
    });
  }

  const users = roomStore.getUsersInRoom(roomId);

  res.json({
    success: true,
    data: {
      roomId: room.roomId,
      language: room.language,
      userCount: users.length,
      createdAt: room.createdAt,
      lastActive: room.lastActive,
    },
  });
});

export default router;