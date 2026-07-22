import { useNavigate } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';
import AuroraGlow from '../components/ui/AuroraGlow.jsx';
import GlassCard from '../components/ui/GlassCard.jsx';
import PillButton from '../components/ui/PillButton.jsx';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6">
      <AuroraGlow />

      <GlassCard padding="p-12" rounded="rounded-3xl" className="text-center max-w-md relative z-10">
        <AlertCircle className="w-16 h-16 text-aurora-magenta mx-auto mb-6 animate-glow-pulse" />

        <h1 className="font-roboto font-bold text-8xl text-gradient-aurora mb-4">
          404
        </h1>

        <p className="text-3xl text-white mb-2">Page Not Found</p>
        <p className="text-lg text-text-secondary mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <PillButton
          variant="primary"
          size="lg"
          onClick={() => navigate('/')}
          icon={<Home className="w-5 h-5" />}
        >
          RETURN TO HOME
        </PillButton>
      </GlassCard>
    </div>
  );
};

export default NotFound;