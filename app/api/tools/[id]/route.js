// app/api/tools/[id]/route.js
import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import Tool from '../../../../models/Tools';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const awaitedParams = await params;
    const tool = await Tool.findById(awaitedParams.id);
    
    if (!tool) {
      return NextResponse.json(
        { success: false, error: 'Tool not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { success: true, data: tool },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching tool:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Unknown error' },
      { status: 500 }
    );
  }
}