// Generate unisex bot avatars using DiceBear (free API)
// Uses "bottts" style - cute neutral robots, perfect for a coding app

export const generateAvatar = (username) => {
  const seed = encodeURIComponent(username || 'user');

  // Aurora theme colors for bot backgrounds
  const backgroundColors = [
    'a855f7', // purple
    'ec4899', // magenta
    '06b6d4', // cyan
    'f97316', // orange
    '14b8a6', // teal
    '8b5cf6', // violet
  ];

  return `https://api.dicebear.com/7.x/bottts/svg?seed=${seed}&backgroundColor=${backgroundColors.join(',')}&backgroundType=gradientLinear`;
};

// Alternative avatar styles (all unisex/neutral)
export const AVATAR_STYLES = {
  bottts: 'bottts',           // Cute robots (default)
  identicon: 'identicon',     // Geometric patterns
  shapes: 'shapes',           // Abstract shapes
  rings: 'rings',             // Circular rings
  thumbs: 'thumbs',           // Thumb prints
};

// Generate avatar with custom style
export const generateAvatarWithStyle = (username, style = 'bottts') => {
  const seed = encodeURIComponent(username || 'user');
  return `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}`;
};