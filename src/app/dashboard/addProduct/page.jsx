"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [form, setForm] = useState({
    title: "",
    size: "",
    Chest: "",
    Length: "",
    Category: "",
    Code: "",
    price: "",
    discountPrice: "",
    description: "",
    image: "",
  });
console.log(form);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));

    try {
      const res = await fetch("/api/products", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to upload product");

      toast.success("Product uploaded!");
      setForm({
        title: "",
        size: "",
        Chest: "",
        Length: "",
        Category: "",
        Code: "",
        price: "",
        discountPrice: "",
        description: "",
        image: "",
      });
    
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-md text-black mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        {Object.keys(form).map((key) => (
          key !== "description" ? (
            <input
              key={key}
              type={key.includes("price") ? "number" : "text"}
              name={key}
              placeholder={key}
              value={form[key]}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          ) : (
            <textarea
              key={key}
              name={key}
              placeholder={key}
              value={form[key]}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          )
        ))}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-2">
          Upload Product
        </button>
      </form>
    </div>
  );
};

export default Page;
