// lib/actions/FetchHtml.ts

// This function fetches JSON data from an IPFS CID using a public gateway
export const fetchContentFromIpfs = async (gatewayUrl: string): Promise<string> => {
  if (!gatewayUrl) {
    return '';
  }

  // Use a reliable public IPFS gateway


  try {
    const response = await fetch(gatewayUrl,{
      mode:'cors'
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch content from IPFS: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Corrected: Read from the 'data' key instead of 'html_content'
    return data.data || '';
  } catch (error) {
    console.error(`Error fetching IPFS content for CID ${gatewayUrl}:`, error);
    return '';
  }
};