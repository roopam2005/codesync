import { useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useRoomStore from '../store/useRoomStore.js';
import EditorBackground from '../three/EditorBackground.jsx';
import LoadingSpinner from '../components/ui/LoadingSpinner.jsx';

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

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="glass rounded-3xl p-12 text-center max-w-2xl">
          <LoadingSpinner size="lg" text="Editor coming in Phase 8..." />

          <div className="mt-8 pt-8 border-t border-white/10">
            <p className="text-lg text-text-muted mb-2">Room ID</p>
            <p className="font-roboto font-bold text-3xl text-gradient-aurora">
              {roomId}
            </p>
          </div>

          <button
            onClick={() => navigate('/')}
            className="mt-8 text-text-secondary hover:text-white transition-colors"
          >
            ← Back to home
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;