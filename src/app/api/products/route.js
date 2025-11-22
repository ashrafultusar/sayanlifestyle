
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

connectDB();

export const POST = async (req) => {
  try {
    const formData = await req.formData();

    const productData = {
      title: formData.get("title"),
      size: formData.get("size"),
      Category: formData.get("Category"),
      homeCategory: formData.get("homecategory") || "",
      Code: formData.get("Code"),
      price: Number(formData.get("price")),
      discountPrice: Number(formData.get("discountPrice")) || 0, // optional
      description: formData.get("description") || "",
    };

    const images = formData.getAll("images");

    // Required validation
    const requiredFields = ["title", "size", "Category", "Code", "price"];
    for (let field of requiredFields) {
      if (!productData[field]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 });
      }
    }

    if (!images || images.length === 0) {
      return NextResponse.json({ error: "At least one image is required" }, { status: 400 });
    }

    // Upload images to Cloudinary
    const uploadPromises = images.map(async (image) => {
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { resource_type: "image" },
          (err, result) => {
            if (err) return reject(err);
            resolve(result.secure_url);
          }
        ).end(buffer);
      });
    });

    productData.image = await Promise.all(uploadPromises);

    const product = await Product.create(productData);

    return NextResponse.json({ message: "Product uploaded", product }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};

  

export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 12;
    const search = searchParams.get("search") || "";
    const categoryParam = searchParams.get("category") || "";

    const skip = (page - 1) * limit;

    let query = {};

    
    if (search && categoryParam) {
      query = {
        Category: categoryParam,
        title: { $regex: search, $options: "i" },
      };
    }
   
    else if (categoryParam) {
      query = { Category: categoryParam };
    }
 
    else if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { Category: { $regex: search, $options: "i" } },
        ],
      };
    }

    // Sorting
    const sort = searchParams.get("sort") || "newest";
    let sortOption = { createdAt: -1 };
    if (sort === "lowToHigh") sortOption = { price: 1 };
    else if (sort === "highToLow") sortOption = { price: -1 };

    const [products, total] = await Promise.all([
      Product.find(query).sort(sortOption).skip(skip).limit(limit),
      Product.countDocuments(query),
    ]);

    return NextResponse.json({ products, total }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};

