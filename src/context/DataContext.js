// context/DataContext.js
"use client";
import { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // Categories states
  const [categories, setCategories] = useState([]);
  const [catLoading, setCatLoading] = useState(true);
  const [catError, setCatError] = useState(null);

  // Products states
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [prodLoading, setProdLoading] = useState(true);

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        setCatError(err.message);
      } finally {
        setCatLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      setProdLoading(true);
      const res = await fetch(`/api/products?page=1&limit=12&sort=newest`);
      const data = await res.json();
      setProducts(data.products || []);
      setTotalCount(data.total || 0);
      setProdLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <DataContext.Provider
      value={{
        // categories
        categories,
        setCategories,
        catLoading,
        catError,
        // products
        products,
        setProducts,
        totalCount,
        prodLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// easy hook
export const useData = () => useContext(DataContext);
