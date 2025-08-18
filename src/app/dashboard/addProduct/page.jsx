"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !price || !image) {
      toast.error("Title, Price, and Image are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const res = await fetch("/api/products", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to upload product");

      toast.success("Product uploaded!");
      setTitle("");
      setPrice("");
      setDescription("");
      setImage(null);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-md text-black mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2 rounded" />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} className="border p-2 rounded" />
        <input type="text" placeholder="image url"  className="border p-2 rounded" />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2 rounded" />
      
        <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-2">Upload Product</button>
      </form>
    </div>
  );
};

export default Page;
