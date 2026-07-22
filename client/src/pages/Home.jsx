import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Zap, Users, Code2, Rocket, ArrowRight, Sparkles, User, Hash } from 'lucide-react';
import { generateRoomId } from '../utils/generateRoomId.js';
import HomeBackground from '../three/HomeBackground.jsx';
import AuroraGlow from '../components/ui/AuroraGlow.jsx';
import GlassCard from '../components/ui/GlassCard.jsx';
import PillButton from '../components/ui/PillButton.jsx';
import Input from '../components/ui/Input.jsx';

const Home = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  // ==================== HANDLERS ====================

  const handleCreateRoom = () => {
    const trimmedUsername = username.trim();

    if (!trimmedUsername) {
      toast.error('Please enter a username');
      return;
    }

    if (trimmedUsername.length < 2) {
      toast.error('Username must be at least 2 characters');
      return;
    }

    setIsCreating(true);
    const newRoomId = generateRoomId();

    setTimeout(() => {
      navigate(`/editor/${newRoomId}`, { state: { username: trimmedUsername } });
      toast.success('Room created! 🚀');
    }, 300);
  };

  const handleJoinRoom = () => {
    const trimmedRoomId = roomId.trim();
    const trimmedUsername = username.trim();

    if (!trimmedRoomId || !trimmedUsername) {
      toast.error('Please fill both Room ID and Username');
      return;
    }

    if (trimmedUsername.length < 2) {
      toast.error('Username must be at least 2 characters');
      return;
    }

    setIsJoining(true);

    setTimeout(() => {
      navigate(`/editor/${trimmedRoomId}`, { state: { username: trimmedUsername } });
    }, 300);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (roomId.trim()) {
        handleJoinRoom();
      } else {
        handleCreateRoom();
      }
    }
  };

  const scrollToJoin = () => {
    document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' });
  };

  // ==================== DATA ====================

  const features = [
    {
      icon: <Code2 className="w-8 h-8" />,
      title: 'JS & Python',
      description: 'Write and run JavaScript or Python code together. Perfect for pair programming and interviews.',
      number: '01',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Real-Time Sync',
      description: 'Every keystroke syncs instantly across all connected users. See changes as they happen.',
      number: '02',
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: 'Instant Runner',
      description: 'Execute code directly in your browser. No servers, no delays — just click RUN and see output.',
      number: '03',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Zero Setup',
      description: 'No signup, no downloads. Create a room, share the ID, start coding together in seconds.',
      number: '04',
    },
  ];

  const steps = [
    { num: '01', title: 'Create Room', desc: 'Generate a unique Room ID with one click' },
    { num: '02', title: 'Share ID', desc: 'Send the Room ID to your teammates' },
    { num: '03', title: 'Code Together', desc: 'Collaborate in real-time on JavaScript or Python' },
  ];

  const stats = [
    { label: 'ROOMS', value: '∞' },
    { label: 'LATENCY', value: '<50ms' },
    { label: 'SETUP', value: '0 SEC' },
    { label: 'COST', value: 'FREE' },
  ];

  return (
    <div className="relative min-h-screen">
      {/* ==================== BACKGROUNDS ==================== */}
      <HomeBackground />
      <AuroraGlow />

      {/* Subtle scroll fade overlay */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(5,5,5,0.15) 40%, rgba(5,5,5,0.35) 100%)',
        }}
      />

      {/* ==================== NAVBAR ==================== */}
      <nav className="relative z-10 flex justify-between items-center px-6 md:px-16 py-6">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="font-roboto font-bold text-2xl md:text-3xl tracking-wider"
        >
          CodeSync
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden md:flex gap-8 text-lg text-text-secondary"
        >
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
          <a href="#join" className="hover:text-white transition-colors">Get Started</a>
        </motion.div>
      </nav>

      {/* ==================== HERO SECTION ==================== */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 -mt-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-sm md:text-lg tracking-[0.3em] text-text-secondary mb-4"
        >
          REAL-TIME COLLABORATION
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-roboto font-bold text-6xl md:text-8xl lg:text-9xl text-gradient tracking-wider text-center leading-none"
        >
          CodeSync
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg md:text-2xl text-text-secondary mt-6 mb-12 text-center max-w-2xl px-4"
        >
          Code together in real-time. No signup, no setup, just pure collaboration.
        </motion.p>

        {/* Join Form */}
        <motion.div
          id="join"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="w-full max-w-md px-4"
        >
          <GlassCard padding="p-8" rounded="rounded-3xl">
            <div className="space-y-3 mb-5">
              <Input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKeyDown}
                icon={<User className="w-5 h-5" />}
              />

              <Input
                type="text"
                placeholder="Room ID (leave empty to create new)"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                onKeyDown={handleKeyDown}
                icon={<Hash className="w-5 h-5" />}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <PillButton
                variant="primary"
                onClick={handleCreateRoom}
                disabled={isCreating}
                className="flex-1"
              >
                {isCreating ? 'CREATING...' : 'CREATE ROOM'}
              </PillButton>
              <PillButton
                variant="secondary"
                onClick={handleJoinRoom}
                disabled={isJoining}
                className="flex-1"
              >
                {isJoining ? 'JOINING...' : 'JOIN ROOM'}
              </PillButton>
            </div>
          </GlassCard>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 text-text-muted text-sm tracking-widest cursor-pointer"
          onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
        >
          SCROLL TO EXPLORE ↓
        </motion.div>
      </section>

      {/* ==================== STATS BAR ==================== */}
      <section className="relative z-10 border-t border-b border-white/5 py-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-xs tracking-widest text-text-muted mb-2">{stat.label}</p>
              <p className="font-roboto font-bold text-3xl md:text-4xl text-white">{stat.value}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ==================== FEATURES SECTION ==================== */}
      <section id="features" className="relative z-10 py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Sparkles className="w-6 h-6 text-aurora-purple mx-auto mb-4 animate-glow-pulse" />
            <h2 className="font-roboto font-bold text-4xl md:text-5xl lg:text-6xl text-gradient mb-4">
              What's inside?
            </h2>
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
              Everything you need to collaborate on code, without the friction.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassCard hover className="relative overflow-hidden group h-full">
                  <div className="text-aurora-purple mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="font-roboto font-semibold text-2xl mb-3 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary text-lg leading-relaxed">
                    {feature.description}
                  </p>
                  <span className="absolute bottom-4 right-4 font-roboto font-bold text-4xl text-white/5">
                    {feature.number}
                  </span>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section id="how-it-works" className="relative z-10 py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Sparkles className="w-6 h-6 text-aurora-cyan mx-auto mb-4 animate-glow-pulse" />
            <h2 className="font-roboto font-bold text-4xl md:text-5xl lg:text-6xl text-gradient mb-4">
              How it works
            </h2>
            <p className="text-lg md:text-xl text-text-secondary">
              Three steps. That's it.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                <div className="font-roboto font-bold text-7xl md:text-8xl text-gradient-aurora mb-4">
                  {step.num}
                </div>
                <h3 className="font-roboto font-semibold text-2xl md:text-3xl mb-3">
                  {step.title}
                </h3>
                <p className="text-lg text-text-secondary">{step.desc}</p>

                {i < steps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-12 -right-6 w-8 h-8 text-aurora-purple/50" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="relative z-10 py-24 md:py-32 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <GlassCard padding="p-8 md:p-16" rounded="rounded-3xl" className="text-center">
            <h2 className="font-roboto font-bold text-4xl md:text-5xl lg:text-6xl text-gradient mb-6">
              Ready to collaborate?
            </h2>
            <p className="text-lg md:text-xl text-text-secondary mb-8">
              Jump into a room and start coding with your team right now.
            </p>
            <div className="flex justify-center">
              <PillButton variant="primary" size="lg" onClick={scrollToJoin}>
                GET STARTED
              </PillButton>
            </div>
          </GlassCard>
        </motion.div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="relative z-10 border-t border-white/5 py-8 text-center px-6">
        <p className="text-text-muted text-lg">
          Made with{' '}
          <span className="text-aurora-magenta animate-glow-pulse">♥</span> by{' '}
          <a
            href="https://www.linkedin.com/in/roopamviradiya"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gradient-aurora font-semibold hover:underline transition-all"
          >
            Roopam
          </a>
        </p>
        <p className="text-text-muted text-sm mt-2">
          © 2026 CodeSync. Free forever.
        </p>
      </footer>
    </div>
  );
};

export default Home;