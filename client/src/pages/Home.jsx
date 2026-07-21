import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Zap, Users, Code2, Rocket, ArrowRight, Sparkles } from 'lucide-react';
import { generateRoomId } from '../utils/generateRoomId.js';
import HomeBackground from '../three/HomeBackground.jsx';
import AuroraGlow from '../components/ui/AuroraGlow.jsx';

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
    toast.success('Room created! 🚀');
  };

  const handleJoinRoom = () => {
    if (!roomId.trim() || !username.trim()) {
      toast.error('Please fill both Room ID and Username');
      return;
    }
    navigate(`/editor/${roomId.trim()}`, { state: { username } });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleJoinRoom();
  };

  const features = [
    {
      icon: <Code2 className="w-8 h-8" />,
      title: 'Multi-Language',
      description: 'Support for 15+ languages including JavaScript, Python, Java, C++, Go, Rust, and more.',
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
      title: 'Code Runner',
      description: 'Execute your code in-browser with our sandboxed environment. Get instant output.',
      number: '03',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Zero Setup',
      description: 'No signup, no downloads. Create a room, share the ID, start coding together.',
      number: '04',
    },
  ];

  const steps = [
    { num: '01', title: 'Create Room', desc: 'Generate a unique Room ID with one click' },
    { num: '02', title: 'Share ID', desc: 'Send the Room ID to your teammates' },
    { num: '03', title: 'Code Together', desc: 'Collaborate in real-time on any language' },
  ];

  return (
    <div className="relative min-h-screen">
      {/* ==================== BACKGROUNDS ==================== */}
      <HomeBackground />
      <AuroraGlow />

      {/* Subtle scroll fade overlay - creates depth without harsh edges */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(5,5,5,0.15) 40%, rgba(5,5,5,0.35) 100%)',
        }}
      />

      {/* ==================== NAVBAR ==================== */}
      <nav className="relative z-10 flex justify-between items-center px-8 md:px-16 py-6">
        <h2 className="font-roboto font-bold text-2xl tracking-wider">CodeSync</h2>
        <div className="flex gap-8 text-lg text-text-secondary">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
          <a href="#join" className="hover:text-white transition-colors">Get Started</a>
        </div>
      </nav>

      {/* ==================== HERO SECTION ==================== */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 -mt-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-lg tracking-[0.3em] text-text-secondary mb-4"
        >
          REAL-TIME COLLABORATION
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-roboto font-bold text-7xl md:text-9xl text-gradient tracking-wider text-center leading-none"
        >
          CodeSync
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-xl md:text-2xl text-text-secondary mt-6 mb-12 text-center max-w-2xl"
        >
          Code together in real-time. No signup, no setup, just pure collaboration.
        </motion.p>

        {/* Join Form */}
        <motion.div
          id="join"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="glass p-8 rounded-3xl w-full max-w-md"
        >
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-3 text-xl mb-3 focus:outline-none focus:border-aurora-purple transition-colors"
          />

          <input
            type="text"
            placeholder="Room ID (leave empty to create new)"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-3 text-xl mb-5 focus:outline-none focus:border-aurora-purple transition-colors"
          />

          <div className="flex gap-3">
            <button
              onClick={handleCreateRoom}
              className="flex-1 bg-white text-black font-medium py-3 rounded-full hover:scale-105 transition-transform text-lg"
            >
              CREATE ROOM
            </button>
            <button
              onClick={handleJoinRoom}
              className="flex-1 border border-white/30 py-3 rounded-full hover:bg-white/10 transition-colors text-lg"
            >
              JOIN ROOM
            </button>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 text-text-muted text-sm tracking-widest"
        >
          SCROLL TO EXPLORE ↓
        </motion.div>
      </section>

      {/* ==================== STATS BAR ==================== */}
      <section className="relative z-10 border-t border-b border-white/5 py-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6">
          {[
            { label: 'LANGUAGES', value: '15+' },
            { label: 'LATENCY', value: '<50ms' },
            { label: 'ROOMS', value: '∞' },
            { label: 'COST', value: 'FREE' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-xs tracking-widest text-text-muted mb-2">{stat.label}</p>
              <p className="font-roboto font-bold text-4xl text-white">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== FEATURES SECTION ==================== */}
      <section id="features" className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Sparkles className="w-6 h-6 text-aurora-purple mx-auto mb-4" />
            <h2 className="font-roboto font-bold text-5xl md:text-6xl text-gradient mb-4">
              What's inside?
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
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
                className="glass glass-hover rounded-2xl p-6 relative overflow-hidden group"
              >
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section id="how-it-works" className="relative z-10 py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Sparkles className="w-6 h-6 text-aurora-cyan mx-auto mb-4" />
            <h2 className="font-roboto font-bold text-5xl md:text-6xl text-gradient mb-4">
              How it works
            </h2>
            <p className="text-xl text-text-secondary">
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
                <div className="font-roboto font-bold text-8xl text-gradient-aurora mb-4">
                  {step.num}
                </div>
                <h3 className="font-roboto font-semibold text-3xl mb-3">
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
      <section className="relative z-10 py-32 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center glass rounded-3xl p-16"
        >
          <h2 className="font-roboto font-bold text-5xl md:text-6xl text-gradient mb-6">
            Ready to collaborate?
          </h2>
          <p className="text-xl text-text-secondary mb-8">
            Jump into a room and start coding with your team right now.
          </p>
          <button
            onClick={() => document.getElementById('join').scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-black px-10 py-4 rounded-full text-xl font-medium hover:scale-105 transition-transform"
          >
            GET STARTED
          </button>
        </motion.div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="relative z-10 border-t border-white/5 py-8 text-center">
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