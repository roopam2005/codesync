// Reusable glassmorphism card container
const GlassCard = ({
  children,
  className = '',
  hover = false,
  padding = 'p-6',
  rounded = 'rounded-2xl',
  onClick,
}) => {
  const baseClasses = 'glass';
  const hoverClasses = hover ? 'glass-hover cursor-pointer' : '';

  return (
    <div
      onClick={onClick}
      className={`${baseClasses} ${hoverClasses} ${padding} ${rounded} ${className}`}
    >
      {children}
    </div>
  );
};

export default GlassCard;