// "use client";

// import { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Image from "next/image";
// import ProductCard from "@/Components/Card/ProductCard/ProductCard";
// import useProducts from "@/hook/useProducts";
// import Link from "next/link";

// export default function ProductPage() {
//   const { products } = useProducts();
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [selectedImage, setSelectedImage] = useState("");
//   const [selectedSize, setSelectedSize] = useState("");
//   const [courierLocation, setCourierLocation] = useState("inside");
//   const [quantity, setQuantity] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [isOrdering, setIsOrdering] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await fetch(`/api/products/${id}`);
//         if (!res.ok) throw new Error("Failed to fetch product");
//         const data = await res.json();
//         setProduct(data);
//         if (data.image && data.image.length > 0) {
//           setSelectedImage(data.image[0]);
//         }
//       } catch (err) {
//         console.error(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (id) fetchProduct();
//   }, [id]);

//   if (loading) return <p className="text-center py-10">Loading...</p>;
//   if (!product)
//     return <p className="text-center text-black py-10">Product not found</p>;

//   // Calculate total price
//   const courierCharge = courierLocation === "inside" ? 60 : 120;
//   const totalPrice = (product?.discountPrice * quantity || 0) + courierCharge;

//   return (
//     <div className="mt-10 container mx-auto px-4 transition-opacity text-black ease-in duration-500 opacity-100">
//       <div className="flex gap-12 flex-col lg:flex-row">
//         {/* Left: product images */}
//         <div className="flex-1 flex flex-col-reverse gap-3 lg:flex-row">
//           <div className="flex lg:flex-col overflow-x-auto lg:overflow-y-scroll justify-between lg:justify-normal lg:w-[18.7%] w-full">
//             {product.image?.map((img, index) => (
//               <img
//                 key={index}
//                 onClick={() => setSelectedImage(img)}
//                 src={img}
//                 className={`w-[24%] lg:w-full lg:mb-3 flex-shrink-0 cursor-pointer border rounded ${
//                   selectedImage === img ? "border-orange-500" : ""
//                 }`}
//                 alt={`Thumbnail ${index}`}
//               />
//             ))}
//           </div>
//           <div className="w-full lg:w-[80%]">
//             {selectedImage && (
//               <Image
//                 src={selectedImage}
//                 alt={product.title}
//                 width={600}
//                 height={600}
//                 className="w-full h-auto rounded"
//               />
//             )}
//           </div>
//         </div>

//         {/* Right: Product Info */}
//         <div className="flex-1">
//           <h1 className="font-medium text-2xl mt-2">{product?.title}</h1>

//           {/* Price */}
//           <div className="mt-5 flex items-center gap-3">
//             <p className="text-3xl font-medium text-green-600">
//               ৳{product?.discountPrice}
//             </p>
//             <p className="text-lg text-gray-500 line-through">
//               ৳{product?.price}
//             </p>
//           </div>

//           {/* Description */}
//           <p className="mt-5 text-gray-500 lg:w-4/5">{product?.description}</p>

//           {/* Sizes */}
//           <div className="flex flex-col gap-4 my-6">
//             <p className="font-medium">Select Size</p>
//             <div className="flex gap-2">
//               {product?.size?.split(" ")?.map((size, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setSelectedSize(size)}
//                   className={`border py-2 px-4 bg-gray-100 rounded ${
//                     size === selectedSize ? "border-orange-500" : ""
//                   }`}
//                 >
//                   {size}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Quantity Selector */}
//           <div className="my-6">
//             <p className="font-medium mb-2">Quantity</p>
//             <div className="flex items-center border border-gray-300 w-max rounded overflow-hidden">
//               <button
//                 onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                 className="px-4 py-1 text-lg hover:bg-gray-100"
//               >
//                 −
//               </button>
//               <div className="px-6 py-1 border-l border-r text-center">
//                 {quantity}
//               </div>
//               <button
//                 onClick={() => setQuantity(quantity + 1)}
//                 className="px-4 py-1 text-lg hover:bg-gray-100"
//               >
//                 +
//               </button>
//             </div>
//           </div>

//           {/* Courier Location */}
//           <div className="my-6">
//             <p className="font-medium mb-2">Courier Location</p>
//             <div className="flex-col gap-4">
//               <label className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   name="courier"
//                   value="inside"
//                   checked={courierLocation === "inside"}
//                   onChange={() => setCourierLocation("inside")}
//                 />
//                 Inside Dhaka (৳60)
//               </label>
//               <label className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   name="courier"
//                   value="outside"
//                   checked={courierLocation === "outside"}
//                   onChange={() => setCourierLocation("outside")}
//                 />
//                 Outside Dhaka (৳120)
//               </label>
//             </div>
//           </div>

//           {/* Total Price */}
//           <div className="my-4 text-lg font-semibold">
//             Total: <span className="text-green-700">৳{totalPrice}</span>
//           </div>

//           <Link href={"/checkout"}>
//             {" "}
//             <button
//               onClick={() => {
//                 setIsOrdering(true);

//                 const newProduct = {
//                   id,
//                   title: product?.title,
//                   regularPrice: product?.price,
//                   discountPrice: product?.discountPrice,
//                   price: product?.discountPrice, // store this for checkout calculation
//                   image: product?.image?.[0] || "/placeholder.png",
//                   quantity,
//                   courierLocation,
//                   size: selectedSize,
//                 };

//                 const existingCart = JSON.parse(
//                   localStorage.getItem("checkoutData") || "[]"
//                 );

//                 const existingIndex = existingCart.findIndex(
//                   (item) =>
//                     item.id === newProduct.id &&
//                     item.size === newProduct.size &&
//                     item.courierLocation === newProduct.courierLocation
//                 );

//                 if (existingIndex !== -1) {
//                   existingCart[existingIndex].quantity += quantity;
//                 } else {
//                   existingCart.push(newProduct);
//                 }

//                 localStorage.setItem(
//                   "checkoutData",
//                   JSON.stringify(existingCart)
//                 );

//                 setIsOrdering(false);
//               }}
//               disabled={!selectedSize}
//               className={`px-8 py-3 text-sm rounded text-white ${
//                 selectedSize
//                   ? "bg-black cursor-pointer hover:bg-gray-800"
//                   : "bg-gray-400 cursor-not-allowed"
//               }`}
//             >
//               BUY NOW
//             </button>
//           </Link>

//           <hr className="mt-8 lg:w-4/5" />

//           {/* Policy */}
//           <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
//             <p>✅ 100% Original Product.</p>
//             <p>💵 Cash on Delivery available.</p>
//             <p>🔁 Easy return & exchange within 7 days.</p>
//           </div>
//         </div>
//       </div>

//       {/* Description Section */}
//       <div className="mt-20">
//         <div className="flex">
//           <b className="border px-5 py-3 text-sm">Description</b>
//           <p className="border px-5 py-3 text-sm">100% </p>
//         </div>
//         <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
//           <p>{product?.description}</p>
//         </div>
//       </div>

//       {/* Related Products */}
//       <div className="mt-16">
//         <h2 className="text-xl font-semibold mb-4">Related Products</h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//           {products
//             ?.filter(
//               (item) =>
//                 item.category === product.category && item._id !== product._id
//             )
//             ?.slice(0, 7)
//             .map((item) => (
//               <ProductCard
//                 key={item._id}
//                 _id={item._id}
//                 title={item.title}
//                 image={item.image}
//                 discountPrice={item.discountPrice}
//                 price={item.price}
//               />
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import ProductCard from "@/Components/Card/ProductCard/ProductCard";
import useProducts from "@/hook/useProducts";
import Link from "next/link";

export default function ProductPage() {
  const { products } = useProducts();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [courierLocation, setCourierLocation] = useState("inside");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isOrdering, setIsOrdering] = useState(false);

  const [deliveryCharge, setDeliveryCharge] = useState({
    insideDhaka: 0,
    outsideDhaka: 0,
  });

  // Fetch delivery charges from API
  useEffect(() => {
    const fetchCharge = async () => {
      try {
        const res = await fetch("/api/deliveryCharge");
        if (!res.ok) throw new Error("Failed to fetch delivery charge");
        const data = await res.json();
        setDeliveryCharge({
          insideDhaka: data.data.insideDhaka,
          outsideDhaka: data.data.outsideDhaka,
        });
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchCharge();
  }, []);

  // Fetch product by ID
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
  if (!product)
    return <p className="text-center text-black py-10">Product not found</p>;

  // Calculate total price
  const courierCharge =
    courierLocation === "inside"
      ? deliveryCharge.insideDhaka
      : deliveryCharge.outsideDhaka;
  const totalPrice = (product?.discountPrice * quantity || 0) + courierCharge;

  return (
    <div className="mt-10 container mx-auto px-4 transition-opacity text-black ease-in duration-500 opacity-100">
      <div className="flex gap-12 flex-col lg:flex-row">
        {/* Left: product images */}
        <div className="flex-1 flex flex-col-reverse gap-3 lg:flex-row">
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
          <h1 className="font-medium text-2xl mt-2">{product?.title}</h1>

          {/* Price */}
          <div className="mt-5 flex items-center gap-3">
            <p className="text-3xl font-medium text-green-600">
              ৳{product?.discountPrice}
            </p>
            <p className="text-lg text-gray-500 line-through">
              ৳{product?.price}
            </p>
          </div>

          {/* Description */}
          <p className="mt-5 text-gray-500 lg:w-4/5">{product?.description}</p>

          {/* Sizes */}
          <div className="flex flex-col gap-4 my-6">
            <p className="font-medium">Select Size</p>
            <div className="flex gap-2">
              {product?.size?.split(" ")?.map((size, index) => (
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

          {/* Quantity Selector */}
          <div className="my-6">
            <p className="font-medium mb-2">Quantity</p>
            <div className="flex items-center border border-gray-300 w-max rounded overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-1 text-lg hover:bg-gray-100"
              >
                −
              </button>
              <div className="px-6 py-1 border-l border-r text-center">
                {quantity}
              </div>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-1 text-lg hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Courier Location */}
          <div className="my-6">
            <p className="font-medium mb-2">Courier Location</p>
            <div className="flex-col gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="courier"
                  value="inside"
                  checked={courierLocation === "inside"}
                  onChange={() => setCourierLocation("inside")}
                />
                Inside Dhaka (৳{deliveryCharge.insideDhaka})
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="courier"
                  value="outside"
                  checked={courierLocation === "outside"}
                  onChange={() => setCourierLocation("outside")}
                />
                Outside Dhaka (৳{deliveryCharge.outsideDhaka})
              </label>
            </div>
          </div>

          {/* Total Price */}
          <div className="my-4 text-lg font-semibold">
            Total: <span className="text-green-700">৳{totalPrice}</span>
          </div>

          <Link href={"/checkout"}>
            <button
              onClick={() => {
                setIsOrdering(true);

                const newProduct = {
                  id,
                  title: product?.title,
                  regularPrice: product?.price,
                  discountPrice: product?.discountPrice,
                  price: product?.discountPrice,
                  image: product?.image?.[0] || "/placeholder.png",
                  quantity,
                  courierLocation,
                  size: selectedSize,
                };

                const existingCart = JSON.parse(
                  localStorage.getItem("checkoutData") || "[]"
                );

                const existingIndex = existingCart.findIndex(
                  (item) =>
                    item.id === newProduct.id &&
                    item.size === newProduct.size &&
                    item.courierLocation === newProduct.courierLocation
                );

                if (existingIndex !== -1) {
                  existingCart[existingIndex].quantity += quantity;
                } else {
                  existingCart.push(newProduct);
                }

                localStorage.setItem(
                  "checkoutData",
                  JSON.stringify(existingCart)
                );
                setIsOrdering(false);
              }}
              disabled={!selectedSize}
              className={`px-8 py-3 text-sm rounded text-white ${
                selectedSize
                  ? "bg-black cursor-pointer hover:bg-gray-800"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              BUY NOW
            </button>
          </Link>

          <hr className="mt-8 lg:w-4/5" />

          {/* Policy */}
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>✅ 100% Original Product.</p>
            <p>💵 Cash on Delivery available.</p>
            <p>🔁 Easy return & exchange within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">100% </p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>{product?.description}</p>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-xl font-semibold mb-4">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products
            ?.filter(
              (item) =>
                item.category === product.category && item._id !== product._id
            )
            ?.slice(0, 7)
            .map((item) => (
              <ProductCard
                key={item._id}
                _id={item._id}
                title={item.title}
                image={item.image}
                discountPrice={item.discountPrice}
                price={item.price}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
