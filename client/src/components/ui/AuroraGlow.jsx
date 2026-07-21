// CSS-based aurora glow effect (blurred colorful blobs)
const AuroraGlow = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen overflow-hidden pointer-events-none z-0">
      {/* Purple blob - top left */}
      <div
        className="aurora-glow"
        style={{
          background: '#a855f7',
          width: '600px',
          height: '600px',
          top: '-200px',
          left: '-100px',
          animation: 'aurora 20s ease-in-out infinite',
        }}
      />

      {/* Magenta blob - top center */}
      <div
        className="aurora-glow"
        style={{
          background: '#ec4899',
          width: '500px',
          height: '500px',
          top: '-150px',
          left: '30%',
          animation: 'aurora 25s ease-in-out infinite reverse',
        }}
      />

      {/* Orange blob - top right */}
      <div
        className="aurora-glow"
        style={{
          background: '#f97316',
          width: '450px',
          height: '450px',
          top: '-100px',
          right: '10%',
          animation: 'aurora 22s ease-in-out infinite',
          opacity: 0.4,
        }}
      />

      {/* Cyan blob - top far right */}
      <div
        className="aurora-glow"
        style={{
          background: '#06b6d4',
          width: '400px',
          height: '400px',
          top: '-50px',
          right: '-100px',
          animation: 'aurora 28s ease-in-out infinite reverse',
        }}
      />
    </div>
  );
};

export default AuroraGlow;