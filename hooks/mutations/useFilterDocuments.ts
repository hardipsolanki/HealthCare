
// export const useFilterDocuments = () => {
//   return useInfiniteQuery({
//     queryKey: queryKeys.documents.all,
//     initialPageParam: 1,
//     queryFn: ({ pageParam }) => fetchDocumentsWithFilter,
//     getNextPageParam: (lastPage) => lastPage.nextPage,

//   });
// };

// return useMutation({
//     mutationFn: fetchDocumentsWithFilter,
//     // mutationKey: queryKeys.documents.all,

//     onSuccess: () => {
//         console.log("first")
//         // Invalidate and refetch
//         queryClient.invalidateQueries({ queryKey: queryKeys.documents.all })

//     },
//     onError: (error) => {
//         console.log('fetch documents with filters failed:', error)
//     },
// });