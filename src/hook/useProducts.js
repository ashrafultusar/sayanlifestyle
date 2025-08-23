// import { useEffect, useState } from "react";



// const useProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch("/api/products"); 
//         if (!res.ok) throw new Error("Failed to fetch products");
//         const data = await res.json();
//         setProducts(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   return { products, loading, error };
// };

// export default useProducts;

// import { useEffect, useState } from "react";
// const useProducts = (page = 1, limit = 12, category = "", sort = "newest") => {
//   const [products, setProducts] = useState([]);
//   const [totalCount, setTotalCount] = useState(0);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       const query = new URLSearchParams({
//         page,
//         limit,
//         ...(category ? { category } : {}),
//         sort,
//       }).toString();

//       const res = await fetch(`/api/products?${query}`);
//       const data = await res.json();
//       setProducts(data.products || []);
//       setTotalCount(data.total || 0);
//       setLoading(false);
//     };

//     fetchProducts();
//   }, [page, limit, category, sort]);

//   return { products, totalCount, loading };
// };

// export default useProducts;


import { useEffect, useState } from "react";

const useProducts = (
  page = 1,
  limit = 12,
  category = "",
  sort = "newest",
  search = ""
) => {
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const query = new URLSearchParams({
        page,
        limit,
        ...(category ? { category } : {}),
        ...(search ? { search } : {}),
        sort,
      }).toString();

      const res = await fetch(`/api/products?${query}`);
      const data = await res.json();

      setProducts(data.products || []);
      setTotalCount(data.total || 0);
      setLoading(false);
    };

    fetchProducts();
  }, [page, limit, category, sort, search]);

  return { products, totalCount, loading };
};

export default useProducts;
