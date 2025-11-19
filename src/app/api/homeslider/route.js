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
    const sliderImages = formData.getAll("sliderImages");
    const rightImageTopFile = formData.get("rightImageTop");
    const rightImageBottomFile = formData.get("rightImageBottom");

    const sliderUrls = [];
    let rightImageTop = null;
    let rightImageBottom = null;

    // =======================
    // Left Slider Images
    // =======================
    if (sliderImages && sliderImages.length && sliderImages[0] instanceof File) {
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
    }

    // =======================
    // Right Image - Top
    // =======================
    if (rightImageTopFile && rightImageTopFile instanceof File) {
      const buffer = Buffer.from(await rightImageTopFile.arrayBuffer());

      rightImageTop = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "home-right" },
          (err, result) => {
            if (err) reject(err);
            resolve(result.secure_url);
          }
        ).end(buffer);
      });
    }

    // =======================
    // Right Image - Bottom
    // =======================
    if (rightImageBottomFile && rightImageBottomFile instanceof File) {
      const buffer = Buffer.from(await rightImageBottomFile.arrayBuffer());

      rightImageBottom = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "home-right" },
          (err, result) => {
            if (err) reject(err);
            resolve(result.secure_url);
          }
        ).end(buffer);
      });
    }

    // =======================
    // No File Error
    // =======================
    if (
      sliderUrls.length === 0 &&
      !rightImageTop &&
      !rightImageBottom
    ) {
      return NextResponse.json(
        { error: "Please upload at least one image" },
        { status: 400 }
      );
    }

    const created = await HomeSlider.create({
      sliderImages: sliderUrls.length ? sliderUrls : undefined,
      rightImageTop: rightImageTop || undefined,
      rightImageBottom: rightImageBottom || undefined,
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
