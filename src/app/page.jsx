import CategoriesSection from "@/Components/Home/CategoriesSection/CategoriesSection";
import NewArrival from "@/Components/Home/NewArrival/NewArrival";
import Slider from "@/Components/Home/Slider/Slider";




export default function Home() {
  return (
    <div className="flex flex-col gap-8 container mx-auto px-4 py-6">
      <Slider />
      <CategoriesSection />
      <NewArrival></NewArrival>
    </div>
  );
}
