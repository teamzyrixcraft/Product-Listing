import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { IoFilterSharp } from "react-icons/io5";

const MAX_PRICE_INR = 10000; 

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
  const [showFilter, setShowFilter] = useState(false);

  const filterRef = useRef(null);
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
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setShowFilter(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
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

        <div className="flex items-center gap-5 flex-wrap">
          <button
            onClick={() => goHome()}
            className="p-1 border-hidden"
            title="Home"
          >
            <MdHome size={30} />
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

        <div className="relative flex gap-3 items-center">

          <input
            type="text"
            placeholder="Search product or category..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="border px-3 py-2 rounded-full sm:w-64"
          />

          {suggestions.length > 0 && (
            <div className="absolute top-12 left-0 w-full bg-white border rounded shadow-md max-h-60 overflow-y-auto z-50">
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

          <div ref={filterRef} className="relative">
            <button
              onClick={() => setShowFilter(prev => !prev)}
              className="p-2 border rounded-full hover:bg-gray-100"
              title="Filters"
            >
              <IoFilterSharp size={20} />
            </button>

            {showFilter && (
              <div className="absolute right-0 top-12 w-72 bg-white border rounded-lg shadow-lg p-4 z-50">

                <div className="mb-4">
                  <p className="font-semibold mb-2">Price Range (₹)</p>

                  <div className="flex items-center gap-2 text-sm mb-2">
                    <span>₹{minPrice || 0}</span>
                    <span>–</span>
                    <span>₹{maxPrice || MAX_PRICE_INR}</span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max={MAX_PRICE_INR}
                    step="500"
                    value={maxPrice || MAX_PRICE_INR}
                    onChange={(e) => {
                      setMinPrice(0);
                      setMaxPrice(e.target.value);
                    }}
                    className="w-full"
                  />
                </div>

                <div>
                  <p className="font-semibold mb-2">Sort by Price</p>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="border px-3 py-2 rounded w-full"
                  >
                    <option value="">None</option>
                    <option value="low">Low → High</option>
                    <option value="high">High → Low</option>
                  </select>
                </div>

              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
