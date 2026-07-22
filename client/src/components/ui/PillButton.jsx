// Reusable pill-shaped button with variants
const PillButton = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  type = 'button',
  icon = null,
}) => {
  const variants = {
    primary: 'bg-white text-black hover:scale-105',
    secondary: 'border border-white/30 text-white hover:bg-white/10',
    danger: 'bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500/30',
    success: 'bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-400 hover:to-green-400 hover:scale-105 shadow-lg shadow-emerald-500/30',
    gradient: 'bg-gradient-to-r from-aurora-purple to-aurora-magenta text-white hover:scale-105',
  };

  const sizes = {
    sm: 'px-4 py-2 text-base',
    md: 'px-6 py-3 text-lg',
    lg: 'px-10 py-4 text-xl',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        rounded-full
        font-medium
        transition-all
        duration-300
        flex
        items-center
        justify-center
        gap-2
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
};

export default PillButton;