import { deleteDocument } from '@/api/documents/documents.endpoints'
import { queryClient } from '@/lib/queryClient'
import { queryKeys } from '@/lib/queryKeys'
import { useMutation } from '@tanstack/react-query'

export const useDeleteDocument = () => {

  return useMutation({
    mutationFn: deleteDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.documents.all })
    },
    onError: (error) => {
      console.log('Delete document failed:', error)
    },
  })
}