import React from "react";

const Page = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Home Slider</h1>

      {/* Upload Section */}
      <div className="bg-white p-6 rounded-md shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">Upload Image</h2>
        <div className="flex flex-col items-center border-2 border-dashed border-gray-300 p-6 rounded-md">
          <div className="w-20 h-20 bg-gray-100 flex items-center justify-center rounded mb-4">
            <svg
              className="w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16l5-5 4 4 8-8M13 4h7v7"
              />
            </svg>
          </div>
          <button className="px-4 py-2 bg-gray-100 rounded text-sm font-medium hover:bg-gray-200">
            Upload Image
          </button>
        </div>
      </div>

      {/* Manage Slides Section */}
      <div className="bg-white p-6 rounded-md shadow">
        <h2 className="text-lg font-semibold mb-4">Manage Slides</h2>
        <table className="min-w-full">
          <thead>
            <tr className="text-left text-sm font-medium text-gray-600 border-b">
              <th className="py-2">Image</th>
              <th className="py-2">Title</th>
              <th className="py-2">Status</th>
              <th className="py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-3">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Slide"
                  className="w-16 h-10 object-cover rounded"
                />
              </td>
              <td className="py-3 text-black">Home Slider</td>
              <td className="py-3 ">
                <span className="bg-green-100 text-green-800 px-2 py-1 text-xs rounded">
                  Active
                </span>
              </td>
              <td className="py-3 space-x-2">
                <button className="px-3 py-1 text-sm text-black bg-gray-100 rounded hover:bg-gray-200">
                  Edit
                </button>
                <button className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
