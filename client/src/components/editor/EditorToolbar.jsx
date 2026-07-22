// Top toolbar with all editor actions
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Play, Copy, Trash2, LogOut, Loader2 } from 'lucide-react';
import PillButton from '../ui/PillButton.jsx';
import IconButton from '../ui/IconButton.jsx';
import LanguageSelector from './LanguageSelector.jsx';
import useRoomStore from '../../store/useRoomStore.js';
import useEditorStore from '../../store/useEditorStore.js';
import { useCodeExecution } from '../../hooks/useCodeExecution.js';
import { copyToClipboard } from '../../utils/helpers.js';
import { socket, SOCKET_EVENTS } from '../../socket/socket.js';

const EditorToolbar = () => {
  const navigate = useNavigate();
  const { roomId, username } = useRoomStore();
  const { setCode, clearOutput } = useEditorStore();
  const { runCode, isRunning } = useCodeExecution();

  const handleCopyRoomId = () => {
    copyToClipboard(roomId, toast);
  };

  const handleClear = () => {
    // Clear locally
    setCode('');
    clearOutput();
    toast.success('Editor cleared');

    // Sync to other users
    if (roomId) {
      // Broadcast empty code to all users
      socket.emit(SOCKET_EVENTS.CODE_CHANGE, {
        roomId,
        code: '',
      });

      // Broadcast empty output to all users
      socket.emit(SOCKET_EVENTS.OUTPUT_UPDATE, {
        roomId,
        output: '',
        error: null,
        username,
      });
    }
  };

  const handleLeave = () => {
    navigate('/');
    toast.success('Left the room');
  };

  return (
    <div className="glass rounded-2xl px-4 py-3 flex flex-wrap items-center justify-between gap-3">
      {/* Left side - Room info */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-text-muted text-sm">ROOM:</span>
          <button
            onClick={handleCopyRoomId}
            className="font-roboto font-semibold text-lg text-gradient-aurora hover:opacity-80 transition-opacity flex items-center gap-2"
            title="Click to copy"
          >
            {roomId?.slice(0, 20)}...
            <Copy className="w-4 h-4" />
          </button>
        </div>
        <div className="w-px h-6 bg-white/10 hidden md:block" />
        <LanguageSelector />
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center gap-2">
        <PillButton
          variant="success"
          size="sm"
          onClick={runCode}
          disabled={isRunning}
          icon={
            isRunning ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4" />
            )
          }
        >
          {isRunning ? 'RUNNING' : 'RUN'}
        </PillButton>

        <IconButton
          icon={<Trash2 className="w-4 h-4" />}
          onClick={handleClear}
          variant="default"
          size="sm"
          tooltip="Clear editor"
        />

        <IconButton
          icon={<LogOut className="w-4 h-4" />}
          onClick={handleLeave}
          variant="danger"
          size="sm"
          tooltip="Leave room"
        />
      </div>
    </div>
  );
};

export default EditorToolbar;