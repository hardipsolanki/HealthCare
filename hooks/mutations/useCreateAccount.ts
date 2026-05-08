import { createAccount } from '@/api/auth/auth.endpoints'
import { queryKeys } from '@/lib/queryKeys'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createAccount,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all })
    },
    onError: (error) => {
      console.log('Create user failed:', error)
    },
  })
}