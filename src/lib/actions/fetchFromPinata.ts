import { PinataSDK } from "pinata";
import { NEXT_PUBLIC_PINATA_JWT, NEXT_PUBLIC_PINATA_GATEWAY } from '@/lib/config/env';

const pinata = new PinataSDK({
  pinataJwt: NEXT_PUBLIC_PINATA_JWT,
  pinataGateway: NEXT_PUBLIC_PINATA_GATEWAY
});

export async function fetchFromPinata(cid: string) {
  try {
    const response = await pinata.gateways.public.get(cid);

    // This is the key change: check if the response object has the 'ok' property
    if (!response || !response.ok) {
      const status = response?.status || 500;
      const errorText = await response?.text();
      throw new Error(`Failed to fetch file from Pinata: Status ${status}, Error: ${errorText}`);
    }

    const contentType = response.headers.get("Content-Type");

    if (contentType?.includes("application/json")) {
      return await response.json();
    }
    
    // For images or other files, we can return a buffer or the raw response
    return response.arrayBuffer();
    
  } catch (error) {
    console.error("Error fetching from Pinata:", error);
    throw error;
  }
}