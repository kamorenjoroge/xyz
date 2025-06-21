// app/api/tools/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import Tool from '../../../models/Tools';

export async function GET() {
  try {
    await dbConnect();
    const tools = await Tool.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: tools }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
