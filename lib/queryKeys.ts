export const queryKeys = {
  users: {
    all: ['users'] as const,
    lists: () => [...queryKeys.users.all, 'list'] as const,
    detail: (id: string) => [...queryKeys.users.all, 'detail', id] as const,
  },
  documents: {
    all: ['documents'] as const,
    byUser: (userId: string) => [...queryKeys.documents.all, 'byUser', userId] as const,
  },
}