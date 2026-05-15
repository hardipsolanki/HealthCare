export const queryKeys = {
  users: {
    all: () => ['users'] as const,
    list: () => ['users', 'list'] as const,
    detail: (id: string) => ['users', 'detail', id] as const,
  },
  documents: {
    all: () => ['documents'] as const,
    list: (payload?: object) => ['documents', 'list', payload] as const,
    byUser: (userId: string) => ['documents', 'byUser', userId] as const,
    detail: (id: string) => ['documents', 'detail', id] as const,
  },
}