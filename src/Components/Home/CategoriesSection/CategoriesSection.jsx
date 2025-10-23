"use client";

import CategoryCard from "@/Components/Card/CategoryCard/CategoryCard";
import { useData } from "@/context/DataContext";
import Link from "next/link";

export default function CategoriesSection() {
  const { categories } = useData();

  // Split categories into groups alternating 4 and 2
  const groupedCategories = [];
  let toggle = true; // true = 4, false = 2
  let i = 0;

  while (i < categories.length) {
    const groupSize = toggle ? 4 : 2;
    groupedCategories.push(categories.slice(i, i + groupSize));
    i += groupSize;
    toggle = !toggle;
  }

  return (
    <div className="w-full py-10 space-y-8">
      {groupedCategories.map((group, index) => {
        const cols = Math.min(group.length, index % 2 === 0 ? 4 : 2);
        return (
          <div
            key={index}
            className={`grid gap-4 grid-cols-${cols} md:grid-cols-${cols}`}
          >
            {group.map((cat, i) => (
              <Link
                key={i}
                href={`/collection?category=${encodeURIComponent(cat?.name)}`}
              >
                <CategoryCard
                  imageUrl={cat?.imageUrl}
                  name={cat?.name}
                />
              </Link>
            ))}
          </div>
        );
      })}
    </div>
  );
}
