// Circular icon button for toolbars
const IconButton = ({
  icon,
  onClick,
  tooltip = '',
  variant = 'default',
  size = 'md',
  disabled = false,
  className = '',
}) => {
  const variants = {
    default: 'bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-aurora-purple/50',
    primary: 'bg-aurora-purple/20 border border-aurora-purple/40 text-aurora-purple hover:bg-aurora-purple/30',
    danger: 'bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/50',
    success: 'bg-aurora-cyan/10 border border-aurora-cyan/30 text-aurora-cyan hover:bg-aurora-cyan/20',
  };

  const sizes = {
    sm: 'w-9 h-9',
    md: 'w-11 h-11',
    lg: 'w-14 h-14',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={tooltip}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        rounded-full
        flex
        items-center
        justify-center
        transition-all
        duration-300
        hover:scale-110
        ${disabled ? 'opacity-50 cursor-not-allowed hover:scale-100' : ''}
        ${className}
      `}
    >
      {icon}
    </button>
  );
};

export default IconButton;