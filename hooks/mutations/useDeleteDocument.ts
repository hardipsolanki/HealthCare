import { deleteDocument } from '@/api/documents/documents.endpoints'
import { queryClient } from '@/lib/queryClient'
import { queryKeys } from '@/lib/queryKeys'
import { useMutation } from '@tanstack/react-query'

export const useDeleteDocument = () => {
  return useMutation({
    mutationFn: deleteDocument,
    onSuccess: (_, documentId) => {
      // ✅ Only invalidate the list, not single document queries
      queryClient.invalidateQueries({ queryKey: queryKeys.documents.all(), exact: true })

      // ✅ Remove the deleted document from cache entirely (no re-fetch)
      queryClient.removeQueries({ queryKey: queryKeys.documents.detail(documentId) })
    },
    onError: (error) => {
      console.log('Delete document failed:', error)
    },
  })
}