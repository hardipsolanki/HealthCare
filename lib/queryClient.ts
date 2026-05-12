import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,   // 5 min: don't refetch if fresh
      gcTime: 1000 * 60 * 10,     // 10 min: keep in cache after unmount
      // retry: 2,
      refetchOnWindowFocus: false, // adjust per app needs
    },
  },
})