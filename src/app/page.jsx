import AllProducts from "@/Components/Home/AllProducts/AllProducts";
import BestSellingProducts from "@/Components/Home/BestSellingProducts/BestSellingProducts";
import CategoriesSection from "@/Components/Home/CategoriesSection/CategoriesSection";
import NewArrival from "@/Components/Home/NewArrival/NewArrival";
import Slider from "@/Components/Home/Slider/Slider";
import { headers } from "next/headers";

// Server-side base URL detect
async function getBaseUrl() {
  const host = headers().get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  return `${protocol}://${host}`;
}

async function getHomeData() {
  const baseUrl = await getBaseUrl();

  const [sliderRes, categoryRes, productRes, chargeRes] = await Promise.all([
    fetch(`${baseUrl}/api/homeslider`, { cache: "no-store" }),
    fetch(`${baseUrl}/api/categories`, { cache: "no-store" }),
    fetch(`${baseUrl}/api/products?page=1&limit=12&sort=newest`, {
      cache: "no-store",
    }),
    fetch(`${baseUrl}/api/deliveryCharge`, { cache: "no-store" }),
  ]);

  // সব json parse করা
  const [slider, categories, products, deliveryCharge] = await Promise.all([
    sliderRes.json(),
    categoryRes.json(),
    productRes.json(),
    chargeRes.json(),
  ]);

  return { slider, categories, products, deliveryCharge };
}

export default async function Home() {
  const { slider, categories, products } = await getHomeData();

  const allProducts = products?.products || [];

  const bestSellerProducts = allProducts.filter(
    (p) => p.homeCategory === "bestseller"
  );
  const newArrivalProducts = allProducts.filter(
    (p) => p.homeCategory === "newarrival"
  );

  return (
    <div className="flex flex-col gap-8 py-6">
      <Slider data={slider} />
      {newArrivalProducts?.length > 0 && (
        <NewArrival products={newArrivalProducts} />
      )}
      <CategoriesSection categories={categories} />
      {bestSellerProducts?.length > 0 && (
        <BestSellingProducts products={bestSellerProducts} />
      )}{" "}

      <AllProducts products={allProducts}/>
    </div>
  );
}
