// Sidebar showing all connected users
import { Users } from 'lucide-react';
import UserAvatar from './UserAvatar.jsx';
import useRoomStore from '../../store/useRoomStore.js';
import { socket } from '../../socket/socket.js';

const UsersList = () => {
  const { users, username } = useRoomStore();

  return (
    <div className="glass rounded-2xl flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-aurora-purple" />
          <span className="text-lg text-white">USERS</span>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-aurora-purple/20 text-aurora-purple text-sm">
          {users.length}
        </span>
      </div>

      {/* User list */}
      <div className="flex-1 overflow-auto p-3 space-y-2">
        {users.length === 0 ? (
          <p className="text-text-muted text-center text-base py-4">
            No users yet...
          </p>
        ) : (
          users.map((user) => (
            <UserAvatar
              key={user.socketId}
              username={user.username}
              avatarUrl={user.avatarUrl}
              isCurrentUser={user.socketId === socket.id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default UsersList;