import { fetchDocument } from "@/api/documents/documents.endpoints";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useDocument = (id: string) => {
    return useQuery({
        queryKey: queryKeys.documents.detail(id),
        queryFn: () => fetchDocument(id),
    });
};
