"use client";

import SignUp from "@/Components/signup/SignUp";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [showForm, setShowForm] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAdmins = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/register", { method: "GET" });

      if (!res.ok) throw new Error("Failed to fetch admins");

      const data = await res.json();
      setAdmins(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleDelete = async (email) => {
    if (!confirm("Are you sure you want to delete this admin?")) return;

    try {
      const res = await fetch("/api/auth/register", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to delete admin");
      }

      // Remove deleted admin from UI
      setAdmins((prev) => prev.filter((admin) => admin.email !== email));
    } catch (err) {
      alert("Error deleting admin: " + err.message);
    }
  };

  const handleRoleChange = async (id, newRole) => {
    console.log(id,newRole);
    try {
      const res = await fetch("/api/auth/register", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, role: newRole }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to update role");
      }

      const updated = await res.json();

      setAdmins((prev) =>
        prev.map((admin) =>
          admin._id === id ? { ...admin, role: newRole } : admin
        )
      );
    } catch (err) {
      alert("Error updating role: " + err.message);
    }
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
          <SignUp onSuccess={fetchAdmins} />
        </div>
      )}

      {/* Loading and Error */}
      {loading && <p>Loading admins...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Admin Cards */}
      <div className="space-y-1">
        {admins.length === 0 && !loading && <p>No admins found.</p>}

        {admins?.map((admin) => (
          <div
            key={admin?._id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {admin?.name}
              </h3>
              <p className="text-sm text-gray-600">{admin?.email}</p>
            </div>

            <div className="mt-4 sm:mt-0 flex gap-4 items-center text-black">
              <select className="border rounded-md"
                value={admin?.role}
                onChange={(e) => handleRoleChange(admin?._id, e.target.value)}
              >
                <option value="admin">admin</option>
                <option value="superadmin">superadmin</option>
              </select>

              <button
                onClick={() => handleDelete(admin?.email)}
                className={`text-red-600 hover:text-red-800 ${
                  admin.role === "superadmin"
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={admin.role === "superadmin"}
                title={
                  admin.role === "superadmin" ? "Cannot delete superadmin" : ""
                }
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
