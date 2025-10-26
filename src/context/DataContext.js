"use client"; 
import { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // Categories
  const [categories, setCategories] = useState([]);
  const [catLoading, setCatLoading] = useState(true);
  const [catError, setCatError] = useState(null);

  // Products
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [prodLoading, setProdLoading] = useState(true);

  // Slider
  const [slider, setSlider] = useState(null);
  const [sliderLoading, setSliderLoading] = useState(true);

  // Delivery charge
  const [deliveryCharge, setDeliveryCharge] = useState({
    insideDhaka: 0,
    outsideDhaka: 0,
  });
  const [chargeLoading, setChargeLoading] = useState(true);

  // Server fetch function
  const fetchServerData = async () => {
    try {
      const [sliderRes, categoryRes, productRes, chargeRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/homeslider`, {
          cache: "no-store",
        }),
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`, {
          cache: "no-store",
        }),
        fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?page=1&limit=12&sort=newest`,
          { cache: "no-store" }
        ),
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/deliveryCharge`, {
          cache: "no-store",
        }),
      ]);

      // Parse all responses
      const [sliderData, categoryData, productData, chargeData] = await Promise.all([
        sliderRes.json(),
        categoryRes.json(),
        productRes.json(),
        chargeRes.json(),
      ]);

      // Set state
      setSlider(sliderData?.data?.[0] || null);
      setCategories(categoryData || []);
      setProducts(productData?.products || []);
      setTotalCount(productData?.total || 0);
      setDeliveryCharge({
        insideDhaka: chargeData?.data?.insideDhaka || 0,
        outsideDhaka: chargeData?.data?.outsideDhaka || 0,
      });
    } catch (err) {
      setCatError(err.message || "Something went wrong");
    } finally {
      setCatLoading(false);
      setProdLoading(false);
      setSliderLoading(false);
      setChargeLoading(false);
    }
  };

  useEffect(() => {
    fetchServerData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        categories,
        setCategories,
        catLoading,
        catError,
        products,
        setProducts,
        totalCount,
        prodLoading,
        slider,
        sliderLoading,
        deliveryCharge,
        chargeLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// Easy hook
export const useData = () => useContext(DataContext);
