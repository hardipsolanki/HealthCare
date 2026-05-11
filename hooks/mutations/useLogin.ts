import { login } from '@/api/auth/auth.endpoints'
import { queryKeys } from '@/lib/queryKeys'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useLoginUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all })
    },
    onError: (error) => {
      console.log('Login failed:', error)
    },
  })
}