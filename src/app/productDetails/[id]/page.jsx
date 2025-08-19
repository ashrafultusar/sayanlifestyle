"use client";

import { useState, useEffect } from "react";
import ImageZoom from "react-image-zoom";
import { useParams } from "next/navigation";

export default function ProductPage() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);




  
  // fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
        setSelectedImage(data.images[0]);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);
console.log(product);
  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!product) return <p className="text-center text-black py-10">Product not found</p>;

  const zoomProps = {
    width: 400,
    height: 400,
    zoomWidth: 500,
    img: selectedImage,
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Images */}
        <div className="flex flex-col items-center gap-4">
          <div className="border p-2">
            {/* <ImageZoom {...zoomProps} /> */}
          </div>
          <div className="flex gap-2 mt-2">
            {product?.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Thumbnail ${i}`}
                className={`w-20 h-20 object-cover border cursor-pointer ${
                  selectedImage === img ? "border-blue-500" : "border-gray-300"
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex-1">
          <h1 className="text-2xl font-semibold">{product?.name}</h1>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-gray-500 line-through">
              ৳{product?.originalPrice}
            </span>
            <span className="text-xl font-bold text-green-600">
              ৳{product?.price}
            </span>
          </div>

          <div className="mt-4">
            <label className="block mb-1">Size:</label>
            <select className="border p-2 rounded w-full max-w-xs">
              {product?.sizes?.map((size) => (
                <option key={size}>{size}</option>
              ))}
            </select>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <button className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              Buy Now
            </button>
            <button className="px-6 py-2 border rounded hover:bg-gray-100">
              Add to Cart
            </button>
          </div>

          <div className="mt-4 text-gray-600">
            <p>Outside Dhaka: ৳{product?.deliveryOutside}</p>
            <p>Inside Dhaka: ৳{product?.deliveryInside}</p>
          </div>

          <div className="mt-6">
            <h2 className="font-semibold mb-2">Description:</h2>
            <p>{product?.description}</p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-xl font-semibold mb-4">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {product?.related?.map((item) => (
            <div
              key={item?.id}
              className="border p-2 rounded hover:shadow-lg transition"
            >
              <img
                src={item?.image}
                alt={item?.name}
                className="w-full h-48 object-cover"
              />
              <h3 className="mt-2 text-sm">{item?.name}</h3>
              <p className="text-green-600 font-bold">৳{item?.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
