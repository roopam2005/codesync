// Small badge for status indicators
const StatusBadge = ({
  status = 'connected',
  text = '',
  showDot = true,
  className = '',
}) => {
  const statusConfig = {
    connected: {
      color: 'text-aurora-cyan',
      bg: 'bg-aurora-cyan/10',
      border: 'border-aurora-cyan/30',
      dotColor: 'bg-aurora-cyan',
      defaultText: 'Connected',
    },
    connecting: {
      color: 'text-aurora-orange',
      bg: 'bg-aurora-orange/10',
      border: 'border-aurora-orange/30',
      dotColor: 'bg-aurora-orange',
      defaultText: 'Connecting...',
    },
    disconnected: {
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      dotColor: 'bg-red-500',
      defaultText: 'Disconnected',
    },
    live: {
      color: 'text-aurora-magenta',
      bg: 'bg-aurora-magenta/10',
      border: 'border-aurora-magenta/30',
      dotColor: 'bg-aurora-magenta',
      defaultText: 'Live',
    },
  };

  const config = statusConfig[status] || statusConfig.connected;
  const displayText = text || config.defaultText;

  return (
    <div
      className={`
        inline-flex
        items-center
        gap-2
        px-3
        py-1.5
        rounded-full
        border
        text-sm
        ${config.bg}
        ${config.border}
        ${config.color}
        ${className}
      `}
    >
      {showDot && (
        <span
          className={`w-2 h-2 rounded-full ${config.dotColor} animate-glow-pulse`}
        />
      )}
      <span className="tracking-wider">{displayText}</span>
    </div>
  );
};

export default StatusBadge;