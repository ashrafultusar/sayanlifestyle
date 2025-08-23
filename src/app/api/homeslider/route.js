// app/api/homeslider/route.js
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "@/lib/db";
import HomeSlider from "@/models/HomeSlider";

export const config = {
  api: {
    bodyParser: false,
  },
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  await connectDB();

  const formData = await req.formData();

  try {
    // 1. Handle multiple slider images
    const sliderImages = formData.getAll("sliderImages");
    const sliderUrls = [];

    for (const file of sliderImages) {
      const buffer = Buffer.from(await file.arrayBuffer());

      const url = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "home-slider" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          }
        ).end(buffer);
      });

      sliderUrls.push(url);
    }

    // 2. Right Top
    const rightImageTopFile = formData.get("rightImageTop");
    const topBuffer = Buffer.from(await rightImageTopFile.arrayBuffer());
    const rightImageTop = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: "home-right" }, (err, result) => {
        if (err) reject(err);
        resolve(result.secure_url);
      }).end(topBuffer);
    });

    // 3. Right Bottom
    const rightImageBottomFile = formData.get("rightImageBottom");
    const bottomBuffer = Buffer.from(await rightImageBottomFile.arrayBuffer());
    const rightImageBottom = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: "home-right" }, (err, result) => {
        if (err) reject(err);
        resolve(result.secure_url);
      }).end(bottomBuffer);
    });

    // 4. Save to DB
    const created = await HomeSlider.create({
      sliderImages: sliderUrls,
      rightImageTop,
      rightImageBottom,
    });

    return NextResponse.json({ success: true, data: created });
  } catch (err) {
    console.error("Error uploading:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}



export async function GET() {
    await connectDB();
    try {
      const allSliders = await HomeSlider.find().sort({ createdAt: -1 });
      return NextResponse.json({ success: true, data: allSliders });
    } catch (err) {
      console.error("Fetch error:", err);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
  }
  

  // DELETE: Remove one by ID
export async function DELETE(req) {
    await connectDB();
  
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
  
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
  
    try {
      await HomeSlider.findByIdAndDelete(id);
      return NextResponse.json({ success: true, message: "Deleted successfully" });
    } catch (err) {
      console.error("Delete error:", err);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
  }