import { addDocument } from '@/api/documents/documents.endpoints';
import { queryClient } from '@/lib/queryClient';
import { queryKeys } from '@/lib/queryKeys';
import { AddDocumentInput } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { useRef } from "react";

export const useAddDocument = () => {

  const abortControllerRef = useRef<AbortController | null>(null);
  const mutation =  useMutation({
    mutationFn: (data: AddDocumentInput) => {
      abortControllerRef.current = new AbortController();
      return addDocument(data, abortControllerRef.current.signal);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.documents.all() });
      abortControllerRef.current = null;
    },
    onError: (error: any) => {
      if (error?.code === "ERR_CANCELED") {
        console.log("Request cancelled");
        return;
      }

      console.log("Add document failed:", error);
      abortControllerRef.current = null;
    },
  })

  return {
    ...mutation,
    abortControllerRef,
  };
}