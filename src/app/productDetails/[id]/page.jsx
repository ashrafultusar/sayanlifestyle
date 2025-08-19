"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [loading, setLoading] = useState(true);

  // fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
        if (data.image && data.image.length > 0) {
          setSelectedImage(data.image[0]);
        }
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!product) return <p className="text-center text-black py-10">Product not found</p>;

  return (
    <div className="mt-10 container mx-auto px-4 transition-opacity text-black ease-in duration-500 opacity-100">
      <div className="flex gap-12 flex-col lg:flex-row">
        {/* Left: product images */}
        <div className="flex-1 flex flex-col-reverse gap-3 lg:flex-row">
          {/* Thumbnails */}
          <div className="flex lg:flex-col overflow-x-auto lg:overflow-y-scroll justify-between lg:justify-normal lg:w-[18.7%] w-full">
            {product.image?.map((img, index) => (
              <img
                key={index}
                onClick={() => setSelectedImage(img)}
                src={img}
                className={`w-[24%] lg:w-full lg:mb-3 flex-shrink-0 cursor-pointer border rounded ${
                  selectedImage === img ? "border-orange-500" : ""
                }`}
                alt={`Thumbnail ${index}`}
              />
            ))}
          </div>
          {/* Main Image */}
          <div className="w-full lg:w-[80%]">
            {selectedImage && (
              <Image
                src={selectedImage}
                alt={product.title}
                width={600}
                height={600}
                className="w-full h-auto rounded"
              />
            )}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{product.title}</h1>

          {/* Rating (Static placeholder) */}
          <div className="flex items-center gap-1 mt-2">
            {[1, 2, 3, 4].map((i) => (
              <img key={i} src={""} alt="star" className="w-3" />
            ))}
            <img src={""} alt="star" className="w-3" />
            <p className="pl-2 text-sm">(122)</p>
          </div>

          {/* Price */}
          <div className="mt-5 flex items-center gap-3">
            <p className="text-3xl font-medium text-green-600">৳{product.discountPrice}</p>
            <p className="text-lg text-gray-500 line-through">৳{product.price}</p>
          </div>

          {/* Description */}
          <p className="mt-5 text-gray-500 lg:w-4/5">{product.description}</p>

          {/* Sizes */}
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {product.size?.split(" ")?.map((size, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(size)}
                  className={`border py-2 px-4 bg-gray-100 rounded ${
                    size === selectedSize ? "border-orange-500" : ""
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to cart button */}
          <button
            onClick={() =>
              alert(`Added ${product.title} - Size: ${selectedSize || "N/A"}`)
            }
            className="bg-black text-white px-8 py-3 text-sm rounded active:bg-gray-700"
          >
            ADD TO CART
          </button>

          <hr className="mt-8 lg:w-4/5" />

          {/* Policy */}
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product.</p>
            <p>Cash on Delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description & Reviews */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>{product.description}</p>
        </div>
      </div>

      {/* Related Products (Static placeholder) */}
      <div className="mt-16">
        <h2 className="text-xl font-semibold mb-4">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {(product.related || []).map((item, i) => (
            <div
              key={i}
              className="border p-2 rounded hover:shadow-lg transition cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover rounded"
              />
              <h3 className="mt-2 text-sm">{item.title}</h3>
              <p className="text-green-600 font-bold">৳{item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
