import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({
  products,
  categories,
  search,
  selectedCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  sort,
  setSort,
}) => {
  const [query, setQuery] = useState(search);
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  const navigate = useNavigate();

  useEffect(() => {
    setQuery(search);
  }, [search]);

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      setActiveIndex(-1);
      return;
    }

    setSuggestions(
      products.filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, products]);

  const goHome = (params = "") => {
    navigate(`/${params}`);
    setSuggestions([]);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown" && suggestions.length) {
      setActiveIndex((prev) => (prev + 1) % suggestions.length);
      return;
    }

    if (e.key === "ArrowUp" && suggestions.length) {
      setActiveIndex((prev) =>
        prev <= 0 ? suggestions.length - 1 : prev - 1
      );
      return;
    }

    if (e.key === "Escape") {
      setSuggestions([]);
      setActiveIndex(-1);
      return;
    }

    if (e.key !== "Enter") return;

    e.preventDefault();
    const q = query.trim().toLowerCase();
    if (!q) return;

    if (activeIndex >= 0 && suggestions[activeIndex]) {
      goHome(`?search=${encodeURIComponent(suggestions[activeIndex].title)}`);
      return;
    }

    const matchedCategory = categories.find(cat => cat === q);
    if (matchedCategory) {
      goHome(`?category=${matchedCategory}`);
    } else {
      goHome(`?search=${encodeURIComponent(q)}`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md px-4 py-3">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        {/* LEFT: Home + Categories */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => goHome()}
            className="p-2 border rounded-full"
            title="Home"
          >
            🏠
          </button>

          <button
            onClick={() => goHome()}
            className={`px-3 py-1 rounded-full border ${
              selectedCategory === "all" ? "bg-blue-500 text-white" : ""
            }`}
          >
            All
          </button>

          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => goHome(`?category=${cat}`)}
              className={`px-3 py-1 rounded-full border capitalize ${
                selectedCategory === cat ? "bg-blue-500 text-white" : ""
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* RIGHT: Search + Filters */}
        <div className="relative flex gap-3">
          <input
            type="text"
            placeholder="Search product or category..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="border px-3 py-2 rounded sm:w-64"
          />

          {suggestions.length > 0 && (
            <div className="absolute top-12 left-0 w-full bg-white border rounded shadow-md max-h-60 overflow-y-auto">
              {suggestions.map((item, idx) => (
                <div
                  key={item.id}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() =>
                    goHome(`?search=${encodeURIComponent(item.title)}`)
                  }
                  className={`px-3 py-2 cursor-pointer ${
                    idx === activeIndex
                      ? "bg-blue-100"
                      : "hover:bg-gray-100"
                  }`}
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
            <option value="">Sort</option>
            <option value="low">Price: Low → High</option>
            <option value="high">Price: High → Low</option>
          </select>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
