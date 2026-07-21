import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { generateRoomId } from '../utils/generateRoomId.js';

const Home = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');

  const handleCreateRoom = () => {
    if (!username.trim()) {
      toast.error('Please enter a username');
      return;
    }
    const newRoomId = generateRoomId();
    navigate(`/editor/${newRoomId}`, { state: { username } });
    toast.success('Room created! Share the Room ID with others.');
  };

  const handleJoinRoom = () => {
    if (!roomId.trim() || !username.trim()) {
      toast.error('Please fill both Room ID and Username');
      return;
    }
    navigate(`/editor/${roomId.trim()}`, { state: { username } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <div className="text-center z-10">
        <h1 className="font-roboto text-8xl font-bold text-gradient-aurora mb-2 tracking-wider">
          CODESYNC
        </h1>
        <p className="text-2xl text-text-secondary mb-12">Real-Time Collaborative Code Editor</p>

        <div className="glass p-10 rounded-3xl max-w-md mx-auto">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-base border border-base-border rounded-xl px-6 py-4 text-xl mb-4 focus:outline-none focus:border-aurora-purple"
          />

          <input
            type="text"
            placeholder="Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="w-full bg-base border border-base-border rounded-xl px-6 py-4 text-xl mb-6 focus:outline-none focus:border-aurora-purple"
          />

          <div className="flex gap-4">
            <button
              onClick={handleCreateRoom}
              className="flex-1 bg-white text-black font-medium py-4 rounded-2xl hover:scale-105 transition-all"
            >
              CREATE ROOM
            </button>
            <button
              onClick={handleJoinRoom}
              className="flex-1 border border-white/30 py-4 rounded-2xl hover:bg-white/10 transition-all"
            >
              JOIN ROOM
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;