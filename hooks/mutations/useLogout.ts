import { logout } from '@/api/auth/auth.endpoints'
import { useMutation } from '@tanstack/react-query'


export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // Invalidate and refetch
    },
    onError: (error) => {
      console.log('Logout failed:', error)
    },
  })
}