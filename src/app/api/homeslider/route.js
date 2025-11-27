import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "@/lib/db";
import HomeSlider from "@/models/HomeSlider";

export const config = {
  api: { bodyParser: false },
};

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload helper
const uploadToCloudinary = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder },
      (err, result) => (err ? reject(err) : resolve(result.secure_url))
    ).end(buffer);
  });
};

// Delete helper
const deleteFromCloudinary = (url) => {
  return new Promise((resolve, reject) => {
    const publicId = url.split("/").pop().split(".")[0];
    cloudinary.uploader.destroy(publicId, (err, result) =>
      err ? reject(err) : resolve(result)
    );
  });
};

export async function POST(req) {
  await connectDB();
  const formData = await req.formData();
  const action = formData.get("action");
  const existing = (await HomeSlider.findOne()) || (await HomeSlider.create({}));

  try {
    // 1️⃣ Update single left slider
    if (action === "update-left-partial") {
      const index = parseInt(formData.get("index"));
      const file = formData.get("file");
      if (isNaN(index) || !file)
        return NextResponse.json({ error: "Invalid data" }, { status: 400 });

      const buffer = Buffer.from(await file.arrayBuffer());
      const url = await uploadToCloudinary(buffer, "home-slider");

      const updated = existing.sliderImages || [];
      updated[index] = url;
      existing.sliderImages = updated;
      await existing.save();

      return NextResponse.json({
        success: true,
        message: "Left slider updated",
        data: existing,
      });
    }

    // 2️⃣ Update right top
    if (action === "update-right-top") {
      const file = formData.get("rightImageTop");
      if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

      const buffer = Buffer.from(await file.arrayBuffer());
      const url = await uploadToCloudinary(buffer, "home-right");
      existing.rightImageTop = url;
      await existing.save();

      return NextResponse.json({
        success: true,
        message: "Right top updated",
        data: existing,
      });
    }

    // 3️⃣ Update right bottom
    if (action === "update-right-bottom") {
      const file = formData.get("rightImageBottom");
      if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

      const buffer = Buffer.from(await file.arrayBuffer());
      const url = await uploadToCloudinary(buffer, "home-right");
      existing.rightImageBottom = url;
      await existing.save();

      return NextResponse.json({
        success: true,
        message: "Right bottom updated",
        data: existing,
      });
    }

    // 4️⃣ Delete single left image
    if (action === "delete-left-image") {
      const index = parseInt(formData.get("index"));
      const updated = existing.sliderImages || [];
      if (isNaN(index) || index < 0 || index >= updated.length)
        return NextResponse.json({ error: "Invalid index" }, { status: 400 });

      const urlToDelete = updated[index];
      await deleteFromCloudinary(urlToDelete).catch(() => null);

      updated.splice(index, 1);
      existing.sliderImages = updated;
      await existing.save();

      return NextResponse.json({
        success: true,
        message: "Left image deleted",
        data: existing,
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// GET all slider data
export async function GET() {
  await connectDB();
  const data = await HomeSlider.findOne();
  return NextResponse.json({ success: true, data });
}
