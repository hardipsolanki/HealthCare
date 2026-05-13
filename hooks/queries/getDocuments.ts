import { fetchDocumentsWithFilter } from "@/api/documents/documents.endpoints";
import { queryKeys } from "@/lib/queryKeys";
import { FetchDocumentsPayload } from "@/types";

import { useInfiniteQuery } from "@tanstack/react-query";

export const useFilterDocuments = (
  filters: FetchDocumentsPayload
) => {
  return useInfiniteQuery({
    queryKey: [
      queryKeys.documents.all,
      JSON.stringify(filters),
    ],

    initialPageParam: 0,

    queryFn: async ({ pageParam }) => {
      return fetchDocumentsWithFilter({
        filter: filters.filter || {
          search: "",
        },

        sort: filters.sort || {
          sortBy: "createdAt",
          orderBy: "desc",
        },

        page: {
          pageLimit: 3,
          pageNumber: pageParam,
        },
      });
    },

    getNextPageParam: (lastPage: any) => {
      const currentPage =
        lastPage?.data?.page?.pageNumber || 0;

      const totalPages =
        lastPage?.data?.page?.totalPages || 0;

      return currentPage + 1 < totalPages
        ? currentPage + 1
        : undefined;
    },
  });
};