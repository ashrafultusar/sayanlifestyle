import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Category from "@/models/Category";
import { v2 as cloudinary } from "cloudinary";

// ⬇️ Cloudinary config inline here
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  const formData = await req.formData();
  const name = formData.get("name");
  const file = formData.get("image");

  if (!name || !file) {
    return NextResponse.json({ error: "Missing name or image" }, { status: 400 });
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
            NextResponse.json({ error: "Cloudinary upload failed" }, { status: 500 })
          );
          return;
        }

        // Save category in DB
        const newCategory = new Category({
          name,
          imageUrl: result.secure_url,
        });

        await newCategory.save();

        resolve(NextResponse.json(newCategory, { status: 201 }));
      }
    );

    stream.end(buffer);
  });
}
