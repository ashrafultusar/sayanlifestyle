import connectDB from '@/lib/db';
import DeliveryCharge from '@/models/DeliveryCharge';
import { NextResponse } from 'next/server';

export async function POST(req) {
  await connectDB();

  try {
    const body = await req.json();
    const { insideDhaka, outsideDhaka } = body;

    if (insideDhaka == null || outsideDhaka == null) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    
    const existing = await DeliveryCharge.findOne();

    let result;
    if (existing) {
     
      existing.insideDhaka = insideDhaka;
      existing.outsideDhaka = outsideDhaka;
      result = await existing.save();
    } else {
     
      result = await DeliveryCharge.create({ insideDhaka, outsideDhaka });
    }

    return NextResponse.json(
      { message: 'Delivery charge saved successfully', data: result },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving delivery charge:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}


export async function GET() {
    await connectDB();
  
    try {
      const charge = await DeliveryCharge.findOne();
      return NextResponse.json({ data: charge || {} }, { status: 200 });
    } catch (error) {
      console.error('Error fetching delivery charge:', error);
      return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
  }
  