import { fetchAllStories } from "@/lib/FetchActions/FetchAllStroy";
import { useQuery } from "@tanstack/react-query";

export function useRootStories() {
  return useQuery({
    queryKey: ['rootStories'], // This is the unique key
    queryFn: fetchAllStories,
  });
}