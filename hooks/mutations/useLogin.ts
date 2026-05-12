import { login } from '@/api/auth/auth.endpoints'
import { queryClient } from '@/lib/queryClient'
import { queryKeys } from '@/lib/queryKeys'
import { useMutation } from '@tanstack/react-query'

export const useLoginUser = () => {
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