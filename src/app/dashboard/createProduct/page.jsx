// "use client";

// import { useData } from "@/context/DataContext";
// import { useRouter } from "next/navigation";

// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Page = () => {
//   const { categories } = useData();
//   const router = useRouter();
//   const [form, setForm] = useState({
//     title: "",
//     size: "",

//     Category: "",
//     Code: "",
//     price: "",
//     discountPrice: "",
//     description: "",
//     homecategory: "",
//   });

//   const [imageFiles, setImageFiles] = useState([]);
//   const [imagePreviews, setImagePreviews] = useState([]);

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     setImageFiles((prev) => [...prev, ...files]);
//     setImagePreviews((prev) => [
//       ...prev,
//       ...files.map((file) => URL.createObjectURL(file)),
//     ]);
//   };

//   const removeImage = (indexToRemove) => {
//     setImageFiles(imageFiles.filter((_, index) => index !== indexToRemove));
//     setImagePreviews(
//       imagePreviews.filter((_, index) => index !== indexToRemove)
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData();
//     Object.keys(form).forEach((key) => formData.append(key, form[key]));
//     imageFiles.forEach((file) => {
//       formData.append("images", file);
//     });

//     try {
//       const res = await fetch("/api/products", {
//         method: "POST",
//         body: formData,
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Failed to upload product");

//       toast.success("Product uploaded!");
//       setForm({
//         title: "",
//         size: "",
//         Category: "",
//         Code: "",
//         price: "",
//         discountPrice: "",
//         description: "",
//         homecategory: "",
//       });
//       setImageFiles([]);
//       setImagePreviews([]);
//       router.push("/dashboard/products");
//     } catch (err) {
//       toast.error(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl text-black mx-auto mt-4 p-6 bg-white rounded-lg shadow-xl">
//       <h1 className="text-3xl font-bold mb-6 text-center">Add New Product</h1>
//       <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-8">
//         {/* Left Column for Product Details */}
//         <div className="flex-1 flex flex-col gap-4">
//           <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
//             <h2 className="text-xl font-semibold mb-4">Product Details</h2>
//             <div className="flex flex-col gap-4">
//               <input
//                 type="text"
//                 name="title"
//                 placeholder="Product Title"
//                 value={form.title}
//                 onChange={handleChange}
//                 className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//               <textarea
//                 name="description"
//                 placeholder="Description"
//                 value={form.description}
//                 onChange={handleChange}
//                 className="border p-3 rounded-lg w-full h-32 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//             </div>
//           </div>
//           <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
//             <h2 className="text-xl font-semibold mb-4">Home Category</h2>
//             <div className="flex flex-col gap-4">
//               <select
//                 name="homecategory"
//                 value={form.homeCategory}
//                 onChange={handleChange}
//                 className="text-sm bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               >
//                 <option value="">Select Home Category</option>
//                 <option value="bestseller">Best Seller</option>
//                 <option value="newarrival">New Arrival</option>{" "}
//               </select>
//             </div>
//           </div>

//           <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
//             <h2 className="text-xl font-semibold mb-4">Specifications</h2>
//             <div className="grid grid-cols-2 gap-4">
//               <input
//                 type="text"
//                 name="size"
//                 placeholder="Size (e.g., S, M, L)"
//                 value={form.size}
//                 onChange={handleChange}
//                 className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//               <select
//                 name="Category"
//                 value={form.Category}
//                 onChange={handleChange}
//                 className="text-sm bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded flex items-center gap-2"
//               >
//                 <option value="">Category</option>
//                 {categories?.map((ctg) => (
//                   <option key={ctg._id} value={ctg.name}>
//                     {ctg.name}
//                   </option>
//                 ))}
//               </select>

//               <input
//                 type="text"
//                 name="Code"
//                 placeholder="Product Code"
//                 value={form.Code}
//                 onChange={handleChange}
//                 className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//             </div>
//           </div>

//           <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
//             <h2 className="text-xl font-semibold mb-4">Pricing</h2>
//             <div className="grid grid-cols-2 gap-4">
//               <input
//                 type="number"
//                 name="price"
//                 placeholder="Price"
//                 value={form.price}
//                 onChange={handleChange}
//                 className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//               <input
//                 type="number"
//                 name="discountPrice"
//                 placeholder="Discount Price (optional)"
//                 value={form.discountPrice}
//                 onChange={handleChange}
//                 className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Right Column for Image Upload */}
//         <div className="flex-1 flex flex-col gap-4">
//           <div className="bg-gray-50 p-6 rounded-lg shadow-sm h-full">
//             <h2 className="text-xl font-semibold mb-4">Image Uploads</h2>
//             <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center h-40 flex items-center justify-center flex-col">
//               <p className="text-gray-500 mb-2">Drag & Drop Images or</p>
//               <label
//                 htmlFor="image-upload"
//                 className="bg-blue-500 text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-600 transition"
//               >
//                 Browse Files
//               </label>
//               <input
//                 id="image-upload"
//                 type="file"
//                 name="images"
//                 multiple
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="hidden"
//               />
//             </div>
//             {imagePreviews.length > 0 && (
//               <div className="mt-4 grid grid-cols-3 gap-2">
//                 {imagePreviews.map((src, index) => (
//                   <div key={index} className="relative group">
//                     <img
//                       src={src}
//                       alt={`Preview ${index}`}
//                       className="w-full h-24 object-cover rounded-lg"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => removeImage(index)}
//                       className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold opacity-0 group-hover:opacity-100 transition"
//                     >
//                       X
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//           <button
//             type="submit"
//             disabled={loading}
//             className={`bg-green-600 text-white p-4 rounded-lg mt-auto text-xl font-semibold cursor-pointer hover:bg-green-700 transition flex items-center justify-center gap-2 ${
//               loading ? "opacity-70 cursor-not-allowed" : ""
//             }`}
//           >
//             {loading ? (
//               <>
//                 <svg
//                   className="animate-spin h-6 w-6 text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   ></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
//                   ></path>
//                 </svg>
//                 Uploading...
//               </>
//             ) : (
//               "Save Product"
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Page;

// /app/dashboard/products/add/page.js

"use client";

import { useData } from "@/context/DataContext";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const { categories } = useData();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    size: "",
    Category: "",
    Code: "",
    price: "",
    discountPrice: "",
    description: "",
    homecategory: "",
  });

  const [imageURLs, setImageURLs] = useState([]); // Cloudinary URLs
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  // Upload to Cloudinary (client → cloudinary)
  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", process.env.NEXT_PUBLIC_CLOUD_PRESET); // 'ml_unsigned'

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`, // 'deyvbbuax'
      {
        method: "POST",
        body: data,
      }
    );

    const json = await res.json();

    // Debugging: If upload fails show error
    if (!json.secure_url) {
      console.log("Cloudinary Error Response:", json);
      // এখানে আরও সুস্পষ্ট এরর মেসেজ দেখাচ্ছে
      toast.error(
        `Cloudinary upload failed! Error: ${
          json.error?.message || "Unknown error"
        }`
      );
      return null;
    }

    return json.secure_url;
  };

  // Handle image selection + upload
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Preview images
    setImagePreviews((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);

    const urls = [];

    // Start uploading files one by one
    for (let file of files) {
      const url = await uploadToCloudinary(file);

      if (url) urls.push(url); // only push valid URLs
    }

    setImageURLs((prev) => [...prev, ...urls]);
  };

  const removeImage = (index) => {
    setImageURLs(imageURLs.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const productData = {
      ...form,
      image: imageURLs, // Send Cloudinary URLs
    };

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      toast.success("Product uploaded!");

      // Reset form and images
      setForm({
        title: "",
        size: "",
        Category: "",
        Code: "",
        price: "",
        discountPrice: "",
        description: "",
        homecategory: "",
      });

      setImageURLs([]);
      setImagePreviews([]);

      router.push("/dashboard/products");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="max-w-4xl text-black mx-auto mt-4 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Add New Product</h1>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-8">
        {/* LEFT SIDE */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Product Details</h2>
            <input
              type="text"
              name="title"
              placeholder="Product Title"
              value={form.title}
              onChange={handleChange}
              className="border p-3 mb-3 rounded-lg w-full"
            />

            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full h-32"
            />
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Home Category</h2>
            <select
              name="homecategory"
              value={form.homecategory}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full"
            >
              <option value="">Select Home Category</option>
              <option value="bestseller">Best Seller</option>
              <option value="newarrival">New Arrival</option>
            </select>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Specifications</h2>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                name="size"
                placeholder="Size"
                value={form.size}
                onChange={handleChange}
                className="border  p-3 rounded-lg w-full"
              />
              <input
                type="text"
                name="Code"
                placeholder="Product Code"
                value={form.Code}
                onChange={handleChange}
                className="border p-3 rounded-lg w-full"
              />
            </div>
            <select
              name="Category"
              value={form.Category}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full"
            >
              <option value="">Category</option>
              {/* Assuming categories is fetched from context */}
              {categories?.map((ctg) => (
                <option key={ctg._id} value={ctg.name}>
                  {ctg.name}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Pricing</h2>

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              className="border mb-3 p-3 rounded-lg w-full"
            />

            <input
              type="number"
              name="discountPrice"
              placeholder="Discount Price (optional)"
              value={form.discountPrice}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full"
            />
          </div>
        </div>

        {/* RIGHT SIDE - IMAGES */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Image Uploads</h2>

            <div className="border-2 border-dashed p-6 rounded-lg text-center">
              <label
                htmlFor="image-upload"
                className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer"
              >
                Browse Files
              </label>
              <input
                id="image-upload"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-4">
                {imagePreviews.map((src, index) => (
                  <div key={index} className="relative">
                    <img
                      src={src}
                      className="w-full h-24 object-cover rounded"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      type="button"
                      className="absolute top-1 right-1 bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || imageURLs.length === 0} // Disable if loading or no images uploaded
            className={`bg-green-600 text-white p-4 rounded-lg text-xl font-semibold 
              ${
                loading || imageURLs.length === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-green-700"
              }`}
          >
            {loading ? "Uploading..." : "Save Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
