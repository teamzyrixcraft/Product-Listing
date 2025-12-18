import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import { useProducts } from "../hooks/useProducts";
import { useState } from "react";


const Home = () => {
  const { products, loading } = useProducts();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  // const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  let filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  if (sort === "low") filtered.sort((a, b) => a.price - b.price);
  if (sort === "high") filtered.sort((a, b) => b.price - a.price);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <Filters {...{ search, setSearch, sort, setSort }} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
