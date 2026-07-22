import { useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useRoomStore from '../store/useRoomStore.js';
import { useSocket } from '../hooks/useSocket.js';
import EditorBackground from '../three/EditorBackground.jsx';
import MonacoEditor from '../components/editor/MonacoEditor.jsx';
import EditorToolbar from '../components/editor/EditorToolbar.jsx';
import OutputPanel from '../components/editor/OutputPanel.jsx';
import UsersList from '../components/room/UsersList.jsx';
import LoadingSpinner from '../components/ui/LoadingSpinner.jsx';

const EditorPage = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { setRoom, isConnecting } = useRoomStore();

  const stateUsername = location.state?.username;

  // Redirect if no username
  useEffect(() => {
    if (!stateUsername) {
      toast.error('Please enter username from home page');
      navigate('/');
      return;
    }

    setRoom(roomId, stateUsername);
  }, [roomId, stateUsername, navigate, setRoom]);

  // Initialize socket connection
  useSocket(roomId, stateUsername);

  if (!stateUsername) {
    return null;
  }

  return (
    <div className="relative min-h-screen">
      <EditorBackground />

      {/* Connecting overlay */}
      {isConnecting && (
        <div className="fixed inset-0 z-50 bg-base/90 backdrop-blur-md flex items-center justify-center">
          <LoadingSpinner size="lg" text="Connecting to room..." />
        </div>
      )}

      <div className="relative z-10 h-screen flex flex-col p-4 gap-4">

        {/* ==================== TOP: NAVBAR ==================== */}
        <div className="flex items-center justify-between px-2">
          <button
            onClick={() => navigate('/')}
            className="font-roboto font-bold text-2xl md:text-3xl tracking-wider hover:opacity-80 transition-opacity"
          >
            CodeSync
          </button>
        </div>

        {/* ==================== TOOLBAR ==================== */}
        <EditorToolbar />

        {/* ==================== MAIN LAYOUT ==================== */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[220px_1fr_360px] gap-4 overflow-hidden">

          {/* Left: Users Panel */}
          <div className="hidden lg:block overflow-hidden">
            <UsersList />
          </div>

          {/* Center: Monaco Editor */}
          <div className="overflow-hidden min-h-[400px]">
            <MonacoEditor />
          </div>

          {/* Right: Output Panel */}
          <div className="overflow-hidden min-h-[300px]">
            <OutputPanel />
          </div>

          {/* Mobile: Users panel below (only on mobile/tablet) */}
          <div className="lg:hidden">
            <UsersList />
          </div>
        </div>

      </div>
    </div>
  );
};

export default EditorPage;