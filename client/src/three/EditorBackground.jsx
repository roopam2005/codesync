// Subtle background for editor page (very minimal)
const EditorBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Single subtle glow in top-left corner */}
      <div
        className="aurora-glow"
        style={{
          background: '#a855f7',
          width: '500px',
          height: '500px',
          top: '-200px',
          left: '-200px',
          opacity: 0.15,
        }}
      />

      {/* Second glow bottom-right */}
      <div
        className="aurora-glow"
        style={{
          background: '#06b6d4',
          width: '400px',
          height: '400px',
          bottom: '-150px',
          right: '-150px',
          opacity: 0.1,
        }}
      />
    </div>
  );
};

export default EditorBackground;