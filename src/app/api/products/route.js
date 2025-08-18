import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";


connectDB();

export const POST = async (req) => {
  try {
    const formData = await req.formData();

    const title = formData.get("title");
    const price = formData.get("price");
    const description = formData.get("description");
    const imageFile = formData.get("image");

    if (!title || !price || !imageFile) {
      return NextResponse.json({ error: "Title, Price, and Image required" }, { status: 400 });
    }

    
   

    // Save product to MongoDB
    const product = await Product.create({
      title,
      price,
      description,
    
    });

    return NextResponse.json({ message: "Product uploaded", product }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};





connectDB();

export const GET = async () => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }); // latest first
    return NextResponse.json(products, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};
