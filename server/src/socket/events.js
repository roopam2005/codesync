// All socket event names in one place
export const SOCKET_EVENTS = {
  // Client → Server
  JOIN: 'join',
  LEAVE: 'leave',
  CODE_CHANGE: 'code-change',
  LANGUAGE_CHANGE: 'language-change',
  REQUEST_SYNC: 'request-sync',

  // Server → Client
  JOINED: 'joined',
  USER_LEFT: 'user-left',
  CODE_UPDATE: 'code-update',
  LANGUAGE_UPDATE: 'language-update',
  SYNC_CODE: 'sync-code',
  ERROR: 'error',
};