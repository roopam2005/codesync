// Socket event constants (must match backend exactly)
export const SOCKET_EVENTS = {
  // Client → Server
  JOIN: 'join',
  LEAVE: 'leave',
  CODE_CHANGE: 'code-change',
  LANGUAGE_CHANGE: 'language-change',
  REQUEST_SYNC: 'request-sync',
  OUTPUT_UPDATE: 'output-update',           // NEW

  // Server → Client
  JOINED: 'joined',
  USER_LEFT: 'user-left',
  CODE_UPDATE: 'code-update',
  LANGUAGE_UPDATE: 'language-update',
  SYNC_CODE: 'sync-code',
  OUTPUT_BROADCAST: 'output-broadcast',     // NEW
  ERROR: 'error',
};