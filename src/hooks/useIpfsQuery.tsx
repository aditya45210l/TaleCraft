// hooks/useIpfsContent.ts
import { useQuery } from "@tanstack/react-query";
import { fetchContentFromIpfs } from "@/lib/actions/FetchHtml";

export function useIpfsContent(cid: string) {
  return useQuery({
    queryKey: ['ipfsContent', cid],
    queryFn: () => fetchContentFromIpfs(cid),
    enabled: !!cid, // Only run the query if a CID is provided
    staleTime: Infinity, // The content is immutable, so it never becomes stale
  });
}