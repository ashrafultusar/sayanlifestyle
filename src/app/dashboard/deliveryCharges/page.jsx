'use client';
import React, { useState } from 'react';

const page = () => {
  const [insideDhaka, setInsideDhaka] = useState('100');
  const [outsideDhaka, setOutsideDhaka] = useState('150');

  const handleSave = () => {
    alert(`Saved:\nInside Dhaka: ${insideDhaka}\nOutside Dhaka: ${outsideDhaka}`);
  };

  return (
    <div className="min-h-screen text-black flex items-start justify-center p-4 md:p-10">
      <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Custom Delivery Charge</h1>
        <div className="mb-4">
          <label className="block font-medium mb-1">Inside Dhaka</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            value={insideDhaka}
            onChange={(e) => setInsideDhaka(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Outside Dhaka</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            value={outsideDhaka}
            onChange={(e) => setOutsideDhaka(e.target.value)}
          />
        </div>
        <button
          className="text-black px-4 py-2 rounded hover:bg-green-300 bg-green-500 cursor-pointer transition "
          onClick={handleSave}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default page;
