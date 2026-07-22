// Reusable styled input component
const Input = ({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  onKeyDown,
  disabled = false,
  className = '',
  icon = null,
  rounded = 'rounded-full',
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      {icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
          {icon}
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        disabled={disabled}
        className={`
          w-full
          bg-white/5
          border
          border-white/10
          ${rounded}
          ${icon ? 'pl-12' : 'px-6'}
          ${!icon ? '' : 'pr-6'}
          py-3
          text-xl
          text-white
          placeholder:text-text-muted
          focus:outline-none
          focus:border-aurora-purple
          focus:bg-white/10
          transition-all
          duration-300
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      />
    </div>
  );
};

export default Input;