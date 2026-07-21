import { useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useRoomStore from '../store/useRoomStore.js';

const EditorPage = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { username, setRoom } = useRoomStore();

  useEffect(() => {
    const stateUsername = location.state?.username;

    if (!stateUsername) {
      toast.error('Please enter username from home page');
      navigate('/');
      return;
    }

    setRoom(roomId, stateUsername);
    toast.success(`Joined room: ${roomId}`);
  }, [roomId, location.state, navigate, setRoom]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base">
      <div className="text-center">
        <h1 className="font-roboto text-6xl text-gradient-aurora mb-6">Editor Page</h1>
        <p className="font-vt text-2xl text-text-secondary">
          Room ID: <span className="text-aurora-cyan">{roomId}</span>
        </p>
        <p className="font-vt text-xl text-text-muted mt-4">
          Phase 4 Complete — Full Editor Coming in Phase 8
        </p>
      </div>
    </div>
  );
};

export default EditorPage;