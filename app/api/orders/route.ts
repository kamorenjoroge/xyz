import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import { Order } from '../../../models/Orders';

// GET: Fetch all orders
export async function GET() {
  try {
    await dbConnect();
    const orders = await Order.find({}).sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

// POST: Create a new order
export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    // Optional: Validate essential fields before saving
    const requiredFields = [
      'customerName',
      'customerEmail',
      'phone',
      'shippingAddress',
      'Mpesatransactioncode',
      'items',
      'total'
    ];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const newOrder = await Order.create(body);
    return NextResponse.json(newOrder, { status: 201 });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('Error creating order:', errorMessage);
    return NextResponse.json(
      { error: 'Failed to create order', details: errorMessage },
      { status: 500 }
    );
  }
}
