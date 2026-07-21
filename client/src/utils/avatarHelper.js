export const generateAvatar = (username) => {
  const seed = encodeURIComponent(username || 'user');
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=1e1e2e`;
};