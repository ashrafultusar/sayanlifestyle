"use client";
import SignUp from "@/Components/signup/SignUp";
import React, { useState } from "react";

const dummyAdmins = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice@example.com",
  },
];

const Page = () => {
  const [showForm, setShowForm] = useState(false);
  const [admins, setAdmins] = useState(dummyAdmins);

  const handleDelete = (id) => {
    setAdmins((prev) => prev.filter((admin) => admin.id !== id));
  };

  const handleEdit = (id) => {
    alert(`Edit admin with ID: ${id}`);
    // Add modal/form logic here for real use
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">Manage Admin</h2>
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition duration-200"
        >
          {showForm ? "Hide Create Admin" : "Create Admin"}
        </button>
      </div>

      {/* SignUp Form */}
      {showForm && (
        <div className="mb-8">
          <SignUp />
        </div>
      )}

      {/* Admin Cards - Row wise */}
      <div className="space-y-4">
        {admins.map((admin) => (
          <div
            key={admin.id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{admin.name}</h3>
              <p className="text-sm text-gray-600">{admin.email}</p>
            </div>

            <div className="mt-4 sm:mt-0 flex gap-4">
              <button
                onClick={() => handleEdit(admin.id)}
                className="text-blue-600 hover:text-blue-800"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => handleDelete(admin.id)}
                className="text-red-600 hover:text-red-800"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
