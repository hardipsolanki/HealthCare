import { addDocument } from '@/api/documents/documents.endpoints'
import { queryKeys } from '@/lib/queryKeys'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useAddDocument = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addDocument,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.documents.all })
    },
    onError: (error) => {
      console.log('Add document failed:', error)
    },
  })
}