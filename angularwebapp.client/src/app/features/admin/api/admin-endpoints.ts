const BASE = '/api/admin';

export const ADMIN_ENDPOINTS = {
  users: {
    getAll: `${BASE}/users`,
    create: `${BASE}/users`,
    getById: (id: number) => `${BASE}/users/${id}`,
    update: (id: number) => `${BASE}/users/${id}`,
    delete: (id: number) => `${BASE}/users/${id}`,
  }
} as const;
