// Loading spinner with aurora colors
const LoadingSpinner = ({ size = 'md', text = '', fullScreen = false }) => {
  const sizes = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4',
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div
        className={`
          ${sizes[size]}
          rounded-full
          border-aurora-purple/30
          border-t-aurora-purple
          animate-spin
        `}
      />
      {text && (
        <p className="text-text-secondary text-lg animate-glow-pulse">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 bg-base/80 backdrop-blur-md flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;