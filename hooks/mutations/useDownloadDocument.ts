import { downloadDocument } from '@/api/documents/documents.endpoints'
import { useMutation } from '@tanstack/react-query'

export const useDownloadDocument = () => {
  return useMutation({
    mutationFn: downloadDocument,
    onSuccess: () => {
    },
    onError: (error) => {
      console.log('Download document failed:', error)
    },
  })
}