import { useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useRoomStore from '../store/useRoomStore.js';
import EditorBackground from '../three/EditorBackground.jsx';

const EditorPage = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { setRoom } = useRoomStore();

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
    <div className="relative min-h-screen">
      <EditorBackground />

      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="text-center glass rounded-3xl p-12">
          <h1 className="font-roboto font-bold text-6xl text-gradient-aurora mb-6">
            Editor Page
          </h1>
          <p className="text-2xl text-text-secondary">
            Room ID: <span className="text-aurora-cyan">{roomId}</span>
          </p>
          <p className="text-xl text-text-muted mt-4">
            Phase 5 Complete — Full Editor Coming in Phase 8
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;