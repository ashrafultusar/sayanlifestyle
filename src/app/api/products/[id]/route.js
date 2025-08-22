import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  try {
    await connectDB();

    const { id } = await context.params;

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { id } = params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}




export const config = { api: { bodyParser: false } };

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const form = formidable({ multiples: true });
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    const {
      title, size, Chest, Length,
      Category, Code, price,
      discountPrice, description,
      existingImages: existingRaw
    } = fields;

    let existingImages = [];
    try {
      existingImages = JSON.parse(existingRaw || "[]");
      if (!Array.isArray(existingImages)) existingImages = [];
    } catch {
      console.warn("Invalid existingImages JSON");
    }

    const newImageUrls = [];
    if (files.images) {
      const imageFiles = Array.isArray(files.images)
        ? files.images
        : [files.images];

      for (const file of imageFiles) {
        const buffer = await fs.readFile(file.filepath);
        const filename = `${uuidv4()}-${file.originalFilename}`;
        const uploadPath = path.join(process.cwd(), "public", "uploads", filename);
        await fs.writeFile(uploadPath, buffer);
        newImageUrls.push(`/uploads/${filename}`);
      }
    }

    const allImages = [...existingImages, ...newImageUrls];

    const updated = await Product.findByIdAndUpdate(
      id,
      {
        title, size, Chest, Length,
        Category, Code, price,
        discountPrice, description,
        image: allImages
      },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (err) {
    console.error("PUT error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}