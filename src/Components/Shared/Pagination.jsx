'use client';
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const totalNumbers = 5;
    const half = Math.floor(totalNumbers / 2);

    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    if (currentPage <= half) {
      end = Math.min(totalPages, totalNumbers);
    }

    if (currentPage + half >= totalPages) {
      start = Math.max(1, totalPages - totalNumbers + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-9 h-9 flex items-center justify-center rounded-full border hover:bg-gray-200 disabled:opacity-50"
      >
        &lt;
      </button>

      {currentPage > 3 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className={`w-9 h-9 flex items-center justify-center rounded-full border ${
              currentPage === 1 ? 'bg-black text-white border-black' : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            1
          </button>
          {currentPage > 4 && <span className="px-1 text-gray-500">...</span>}
        </>
      )}

      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-9 h-9 flex items-center justify-center rounded-full border ${
            page === currentPage
              ? 'bg-black text-white border-black'
              : 'text-gray-700 hover:bg-gray-200'
          }`}
        >
          {page}
        </button>
      ))}

      {currentPage < totalPages - 2 && (
        <>
          {currentPage < totalPages - 3 && <span className="px-1 text-gray-500">...</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            className={`w-9 h-9 flex items-center justify-center rounded-full border ${
              currentPage === totalPages ? 'bg-black text-white border-black' : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-9 h-9 flex items-center justify-center rounded-full border hover:bg-gray-200 disabled:opacity-50"
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
