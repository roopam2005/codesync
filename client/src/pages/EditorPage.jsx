import { useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Play, Copy, Trash2, LogOut, Code2, Users } from 'lucide-react';
import useRoomStore from '../store/useRoomStore.js';
import EditorBackground from '../three/EditorBackground.jsx';

// Import all UI components
import GlassCard from '../components/ui/GlassCard.jsx';
import PillButton from '../components/ui/PillButton.jsx';
import IconButton from '../components/ui/IconButton.jsx';
import LoadingSpinner from '../components/ui/LoadingSpinner.jsx';
import StatusBadge from '../components/ui/StatusBadge.jsx';
import Input from '../components/ui/Input.jsx';

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

      <div className="relative z-10 min-h-screen p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-roboto font-bold text-6xl text-gradient-aurora mb-4">
            Component Preview
          </h1>
          <p className="text-2xl text-text-secondary">
            Room ID: <span className="text-aurora-cyan">{roomId}</span>
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-12">

          {/* ==================== GLASS CARDS ==================== */}
          <section>
            <h2 className="font-roboto text-3xl mb-6 text-white">GlassCard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <GlassCard>
                <h3 className="text-2xl mb-2">Default Card</h3>
                <p className="text-text-secondary">Basic glassmorphism</p>
              </GlassCard>
              <GlassCard hover>
                <h3 className="text-2xl mb-2">Hoverable Card</h3>
                <p className="text-text-secondary">Hover me!</p>
              </GlassCard>
              <GlassCard rounded="rounded-3xl" padding="p-8">
                <h3 className="text-2xl mb-2">Custom Card</h3>
                <p className="text-text-secondary">Rounded + padding</p>
              </GlassCard>
            </div>
          </section>

          {/* ==================== PILL BUTTONS ==================== */}
          <section>
            <h2 className="font-roboto text-3xl mb-6 text-white">PillButton</h2>
            <GlassCard>
              <div className="flex flex-wrap gap-4">
                <PillButton variant="primary">Primary</PillButton>
                <PillButton variant="secondary">Secondary</PillButton>
                <PillButton variant="danger">Danger</PillButton>
                <PillButton variant="success">Success</PillButton>
                <PillButton variant="gradient">Gradient</PillButton>
                <PillButton variant="primary" icon={<Play className="w-4 h-4" />}>
                  With Icon
                </PillButton>
                <PillButton variant="primary" size="sm">Small</PillButton>
                <PillButton variant="primary" size="lg">Large</PillButton>
                <PillButton variant="primary" disabled>Disabled</PillButton>
              </div>
            </GlassCard>
          </section>

          {/* ==================== ICON BUTTONS ==================== */}
          <section>
            <h2 className="font-roboto text-3xl mb-6 text-white">IconButton</h2>
            <GlassCard>
              <div className="flex flex-wrap gap-4">
                <IconButton
                  icon={<Play className="w-5 h-5" />}
                  variant="success"
                  tooltip="Run Code"
                />
                <IconButton
                  icon={<Copy className="w-5 h-5" />}
                  variant="default"
                  tooltip="Copy"
                />
                <IconButton
                  icon={<Trash2 className="w-5 h-5" />}
                  variant="danger"
                  tooltip="Delete"
                />
                <IconButton
                  icon={<Code2 className="w-5 h-5" />}
                  variant="primary"
                  tooltip="Code"
                />
                <IconButton
                  icon={<Users className="w-5 h-5" />}
                  variant="default"
                  size="lg"
                  tooltip="Large Button"
                />
                <IconButton
                  icon={<LogOut className="w-5 h-5" />}
                  variant="danger"
                  size="sm"
                  tooltip="Small Button"
                />
              </div>
            </GlassCard>
          </section>

          {/* ==================== INPUTS ==================== */}
          <section>
            <h2 className="font-roboto text-3xl mb-6 text-white">Input</h2>
            <GlassCard>
              <div className="space-y-4">
                <Input placeholder="Basic input..." />
                <Input placeholder="With icon..." icon={<Users className="w-5 h-5" />} />
                <Input placeholder="Rounded corners" rounded="rounded-xl" />
                <Input placeholder="Disabled input" disabled />
              </div>
            </GlassCard>
          </section>

          {/* ==================== STATUS BADGES ==================== */}
          <section>
            <h2 className="font-roboto text-3xl mb-6 text-white">StatusBadge</h2>
            <GlassCard>
              <div className="flex flex-wrap gap-4">
                <StatusBadge status="connected" />
                <StatusBadge status="connecting" />
                <StatusBadge status="disconnected" />
                <StatusBadge status="live" />
                <StatusBadge status="connected" text="Custom Text" />
                <StatusBadge status="live" showDot={false} text="No Dot" />
              </div>
            </GlassCard>
          </section>

          {/* ==================== LOADING SPINNERS ==================== */}
          <section>
            <h2 className="font-roboto text-3xl mb-6 text-white">LoadingSpinner</h2>
            <GlassCard>
              <div className="flex items-center justify-around gap-8">
                <LoadingSpinner size="sm" />
                <LoadingSpinner size="md" text="Loading..." />
                <LoadingSpinner size="lg" text="Please wait..." />
              </div>
            </GlassCard>
          </section>

          {/* ==================== INFO ==================== */}
          <section>
            <GlassCard className="text-center">
              <p className="text-2xl text-aurora-cyan mb-2">
                ✅ Phase 6 Complete
              </p>
              <p className="text-lg text-text-secondary">
                All reusable UI components are ready. Full editor coming in Phase 8!
              </p>
            </GlassCard>
          </section>

        </div>
      </div>
    </div>
  );
};

export default EditorPage;