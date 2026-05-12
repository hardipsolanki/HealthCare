import { fetchDocumentsWithFilter } from "@/api/documents/documents.endpoints";
import { queryKeys } from "@/lib/queryKeys";
import { useInfiniteQuery } from "@tanstack/react-query";

type FilterPayload = {
  filter?: {
    search?: string;
  };
  sort?: {
    sortBy?: string;
    orderBy?: "asc" | "desc";
  };
};

export const useFilterDocuments = (
  filters: FilterPayload
) => {
  return useInfiniteQuery({
    queryKey: [queryKeys.documents.all, filters],

    initialPageParam: 0,

    queryFn: async ({ pageParam }) => {
      return fetchDocumentsWithFilter({
        filter: filters.filter || { search: "" },
        sort: filters.sort || { sortBy: "createdAt", orderBy: "desc" },

        page: {

          pageLimit: 1,
          pageNumber: pageParam,
        },

      });
    },

    getNextPageParam: (lastPage: any) => {
      const currentPage =
        lastPage.data.page.pageNumber;

      const totalPages =
        lastPage.data.page.totalPages;

      return currentPage + 1 < totalPages
        ? currentPage + 1
        : undefined;
    },
  });
};