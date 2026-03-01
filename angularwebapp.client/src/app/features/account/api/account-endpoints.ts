export const ACCOUNT_ENDPOINTS = {
  login: '/api/account/login',
  register: '/api/account/register',
  logout: '/api/account/logout',
  currentUser: '/api/account/me',
  confirmEmail: '/api/account/confirm-email',
} as const;
