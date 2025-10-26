import BestSellingProducts from "@/Components/Home/BestSellingProducts/BestSellingProducts";
import CategoriesSection from "@/Components/Home/CategoriesSection/CategoriesSection";
import NewArrival from "@/Components/Home/NewArrival/NewArrival";
import Slider from "@/Components/Home/Slider/Slider";


async function getHomeData() {
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
  ]);

  const [slider, categories, products, deliveryCharge] = await Promise.all([
    sliderRes.json(),
    categoryRes.json(),
    productRes.json(),
  ]);

  return { slider, categories, products, deliveryCharge };
}

export default async function Home() {
  const { slider, categories, products, deliveryCharge } = await getHomeData();

  return (
    <div className="flex flex-col gap-8 py-6">
      <Slider data={slider} />

      <NewArrival products={products.products} />

      <CategoriesSection categories={categories} />

      <BestSellingProducts products={products.products} />
    </div>
  );
}
