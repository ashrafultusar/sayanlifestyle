"use client";

import CategoryCard from "@/Components/Card/CategoryCard/CategoryCard";
import CategorySkeleton from "@/Components/Skeleton/CategorySkeleton";
import Link from "next/link";

export default function CategoriesSection({
  categories,
  loading = false,
  error = null,
}) {
  // ✅ Skeleton while loading
  if (loading)
    return (
      <div className="w-full py-10 space-y-8">
        {[1, 2, 3].map((row) => (
          <div
            key={row}
            className={`grid gap-4 grid-cols-${
              row % 2 === 1 ? 4 : 2
            } md:grid-cols-${row % 2 === 1 ? 4 : 2}`}
          >
            {Array.from({ length: row % 2 === 1 ? 4 : 2 }).map((_, i) => (
              <CategorySkeleton key={i} />
            ))}
          </div>
        ))}
      </div>
    );

  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  if (!categories || categories.length === 0)
    return (
      <p className="text-center text-gray-500 mt-10">No categories found.</p>
    );

  // ✅ Split categories into groups alternating 4 and 2
  const groupedCategories = [];
  let toggle = true;
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
                <CategoryCard imageUrl={cat?.imageUrl} name={cat?.name} />
              </Link>
            ))}
          </div>
        );
      })}
    </div>
  );
}
