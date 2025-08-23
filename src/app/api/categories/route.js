import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Category from "@/models/Category";
import { v2 as cloudinary } from "cloudinary";

// ✅ Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Create a new category (POST)
export async function POST(req) {
  const formData = await req.formData();
  const name = formData.get("name");
  const file = formData.get("image");

  if (!name || !file) {
    return NextResponse.json(
      { error: "Missing name or image" },
      { status: 400 }
    );
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  await connectDB();

  return new Promise((resolve) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "categories" },
      async (error, result) => {
        if (error) {
          console.error("❌ Cloudinary error:", error);
          resolve(
            NextResponse.json(
              { error: "Cloudinary upload failed" },
              { status: 500 }
            )
          );
          return;
        }

        const newCategory = new Category({
          name,
          imageUrl: result.secure_url, // ✅ Matches schema
        });

        await newCategory.save();

        resolve(NextResponse.json(newCategory, { status: 201 }));
      }
    );

    stream.end(buffer);
  });
}

// ✅ Get all categories (GET)
export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find().sort({ _id: -1 });
    return NextResponse.json(categories, { status: 200 });
  } catch (err) {
    console.error("Failed to fetch categories", err);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

// ✅ Delete category by ID (DELETE)
export async function DELETE(req) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing category ID" }, { status: 400 });
  }

  try {
    await connectDB();
    const deleted = await Category.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Category deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error deleting category:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
