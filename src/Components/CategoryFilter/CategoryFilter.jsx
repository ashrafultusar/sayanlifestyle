const { useRouter, usePathname, useSearchParams } = require("next/navigation");

export function CategoryFilter({ categories, selectedCategory }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
  
    const handleFilterChange = (catName) => {
      const params = new URLSearchParams(searchParams.toString());
      if (catName) {
        params.set("category", catName);
      } else {
        params.delete("category");
      }
      params.set("page", "1");
      router.push(`${pathname}?${params.toString()}`);
    };
  
    return (
      <div className="space-y-2">
        <label className="block">
          <input
            type="radio"
            name="category"
            className="mr-2"
            checked={selectedCategory === ""}
            onChange={() => handleFilterChange("")}
          />
          All
        </label>
        {categories?.map((cat) => (
          <label key={cat._id} className="block">
            <input
              type="radio"
              name="category"
              className="mr-2"
              checked={selectedCategory === cat.name}
              onChange={() => handleFilterChange(cat.name)}
            />
            {cat.name}
          </label>
        ))}
      </div>
    );
  }