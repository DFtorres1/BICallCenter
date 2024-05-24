export const generateQueryKeys = (queryKey) => ({
  all: [queryKey],
  details: () => [queryKey, "details"],
  detail: (id) => [...generateQueryKeys(queryKey).details(), id],
  lists: () => [queryKey, "lists"],
  filteredList: (params) => [...generateQueryKeys(queryKey).lists(), params],
});
