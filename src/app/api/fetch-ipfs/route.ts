// app/api/fetch-ipfs/route.ts
import { NextResponse } from 'next/server';
import { NEXT_PUBLIC_PINATA_GATEWAY } from '@/lib/config/env';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cid = searchParams.get('cid');

  if (!cid) {
    return NextResponse.json({ error: 'CID is required' }, { status: 400 });
  }

  try {
    const ipfsUrl = `${NEXT_PUBLIC_PINATA_GATEWAY}/ipfs/${cid}`;
    const response = await fetch(ipfsUrl);

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch content from IPFS' }, { status: response.status });
    }

    const data = await response.json(); // Assuming your content is a JSON file
    return NextResponse.json(data);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}