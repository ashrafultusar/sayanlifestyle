import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

connectDB();

export const POST = async (req) => {
  try {
    const formData = await req.formData();

    const productData = {
      title: formData.get("title"),
      size: formData.get("size"),
      Chest: formData.get("Chest"),
      Length: formData.get("Length"),
      Category: formData.get("Category"),
      Code: formData.get("Code"),
      price: Number(formData.get("price")),
      discountPrice: Number(formData.get("discountPrice")),
      description: formData.get("description"),
      image: formData.get("image"),
    };

    // Check required fields
    const requiredFields = ["title", "size", "Chest", "Length", "Category", "Code", "price", "discountPrice", "image"];
    for (let field of requiredFields) {
      if (!productData[field]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 });
      }
    }

    const product = await Product.create(productData);

    return NextResponse.json({ message: "Product uploaded", product }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};

export const GET = async () => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return NextResponse.json(products, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};
