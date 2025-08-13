// FetchHtml.ts (Client-side)
import DOMPurify from 'dompurify';

export const fetchAndSanitizeHtml = async (cid: string) => {
  if (!cid) {
    return '';
  }

  try {
    // Call your new server-side API route with the CID
    const response = await fetch(`/api/fetch-ipfs?cid=${cid}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    const jsonResponse = await response.json();
    const rawHtml = jsonResponse.data;
    const sanitizedHtml = DOMPurify.sanitize(rawHtml);
    
    return sanitizedHtml;
  } catch (err) {
    console.error("Error fetching story:", err);
    throw new Error("Could not load story content.");
  }
};