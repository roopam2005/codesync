// Single user avatar card
const UserAvatar = ({ username, avatarUrl, isCurrentUser = false }) => {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-aurora-purple/40 transition-all">
      {/* Avatar with glow */}
      <div className="relative flex-shrink-0">
        <img
          src={avatarUrl}
          alt={username}
          className="w-10 h-10 rounded-full border-2 border-aurora-purple/40"
        />
        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-aurora-cyan rounded-full border-2 border-base animate-glow-pulse" />
      </div>

      {/* Username */}
      <div className="flex-1 min-w-0">
        <p className="text-white text-lg truncate">
          {username}
          {isCurrentUser && (
            <span className="text-aurora-cyan text-sm ml-2">(you)</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default UserAvatar;