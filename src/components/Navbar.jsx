import { useEffect, useState } from "react";

const Navbar = ({
  products,
  search,
  setSearch,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  categories,
  selectedCategory,
  setSelectedCategory,
  sort,
  setSort,
}) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const filtered = products.filter(p =>
      p.title.toLowerCase().includes(query.toLowerCase())
    );

    setSuggestions(filtered);
  }, [query, products]);

  const handleSuggestionClick = (title) => {
    setSearch(title);
    setQuery(title);
    setSuggestions([]);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md px-4 py-3">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        {/* LEFT: Categories */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1 rounded-full border ${
              selectedCategory === "all" ? "bg-blue-500 text-white" : ""
            }`}
          >
            All
          </button>

          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full border capitalize ${
                selectedCategory === cat ? "bg-blue-500 text-white" : ""
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* RIGHT: Search + Filters + Sort */}
        <div className="relative flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border px-3 py-2 rounded sm:w-64"
          />

          {/* Suggestions Box */}
          {suggestions.length > 0 && (
            <div className="absolute top-12 left-0 w-full sm:w-64 bg-white border rounded shadow-md max-h-60 overflow-y-auto z-50">
              {suggestions.map(item => (
                <div
                  key={item.id}
                  onClick={() => handleSuggestionClick(item.title)}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                >
                  {item.title}
                </div>
              ))}
            </div>
          )}

          <input
            type="number"
            placeholder="Min ₹"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="border px-3 py-2 rounded w-24"
          />

          <input
            type="number"
            placeholder="Max ₹"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border px-3 py-2 rounded w-24"
          />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="">Sort By Price</option>
            <option value="low">Low → High</option>
            <option value="high">High → Low</option>
          </select>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
