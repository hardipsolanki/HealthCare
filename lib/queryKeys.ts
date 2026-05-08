export const queryKeys = {
  users: {
    all: ['users'] as const,
    lists: () => [...queryKeys.users.all, 'list'] as const,
    detail: (id: string) => [...queryKeys.users.all, 'detail', id] as const,
  },
  posts: {
    all: ['posts'] as const,
    byUser: (userId: string) => [...queryKeys.posts.all, 'byUser', userId] as const,
  },
}