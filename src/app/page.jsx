import BestSellingProducts from "@/Components/Home/BestSellingProducts/BestSellingProducts";
import CategoriesSection from "@/Components/Home/CategoriesSection/CategoriesSection";
import NewArrival from "@/Components/Home/NewArrival/NewArrival";
import Slider from "@/Components/Home/Slider/Slider";

export default async function Home() {

  return (
    <div className="flex flex-col gap-8   py-6">
      <Slider />
      <NewArrival/>
      <CategoriesSection />
      <BestSellingProducts/>
    </div>
  );
}
