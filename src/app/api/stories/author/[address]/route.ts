
import dbConnect from '@/lib/config/mongoDbConnect';
import Story from '@/lib/models/Story';
import { NextRequest, NextResponse } from 'next/server';

// Define the expected shape of the URL parameters
interface Params {
  address: string;
}

export async function GET(request: NextRequest, { params }: { params: Params }) {
  await dbConnect();

  const { address } = await params;
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const limit = parseInt(searchParams.get('limit') || '50');

  // Type guard to ensure address exists
  if (!address) {
    return NextResponse.json(
      { success: false, error: 'Address parameter is missing' },
      { status: 400 }
    );
  }

  try {
    // Explicitly define the filter's type to handle optional properties
    const filter: { author: string; type?: string } = {
      author: address,

    };

    if (type) {
      filter.type = type;
    }

    const stories = await Story.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit);

    return NextResponse.json({
      success: true,
      data: stories,
      total: stories.length,
    });
  } catch (error) {
    // Use a type guard for the error object
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}