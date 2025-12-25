import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { IoFilterSharp } from "react-icons/io5";

const Navbar = ({
  products,
  categories,
  search,
  selectedCategory,
  sort,
  setSort,
}) => {
  const [query, setQuery] = useState(search);
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showFilter, setShowFilter] = useState(false);

  const [lastCategory, setLastCategory] = useState(selectedCategory);

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
      products
        .filter(p =>
          p.title.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 8)
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

  const handleCategoryClick = (cat) => {
    setLastCategory(cat);
    if (cat === "all") {
      goHome("");
    } else {
      goHome(`?category=${cat}`);
    }
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
    const q = query.trim();
    if (!q) {
      if (lastCategory === "all") {
        goHome("");
      } else {
        goHome(`?category=${lastCategory}`);
      }
      return;
    }
    if (activeIndex >= 0 && suggestions[activeIndex]) {
      goHome(`?search=${encodeURIComponent(suggestions[activeIndex].title)}`);
    } else {
      goHome(`?search=${encodeURIComponent(q)}`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md px-4 py-3">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div className="flex items-center gap-5 flex-wrap">
          <button onClick={() => handleCategoryClick("all")}>
            <MdHome size={30} />
          </button>

          <button
            onClick={() => handleCategoryClick("all")}
            className={`px-3 py-1 rounded-full border ${
              selectedCategory === "all" ? "bg-blue-500 text-white" : ""
            }`}
          >
            All
          </button>

          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
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
            placeholder="Search product..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="border px-3 py-2 rounded-full sm:w-64"
          />

          {suggestions.length > 0 && (
            <div className="absolute top-12 left-0 w-full bg-white border rounded shadow-md z-50">
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
              className="p-2 border rounded-full"
            >
              <IoFilterSharp size={20} />
            </button>

            {showFilter && (
              <div className="absolute right-0 top-12 w-72 bg-white border rounded-lg shadow-lg p-4 z-50">
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
            )}
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
