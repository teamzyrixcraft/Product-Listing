import { useMemo } from "react";
import ProductCard from "../components/ProductCard";

const INR_RATE = 1;

const Home = ({
  products,
  search,
  selectedCategory,
  minPrice,
  maxPrice,
  sort,
}) => {
  const filteredProducts = useMemo(() => {
    let data = [...products];

    if (search) {
      data = data.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      data = data.filter(
        p => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    data = data.filter(p => {
      const priceInINR = p.price * INR_RATE;
      return (
        (minPrice === "" || priceInINR >= Number(minPrice)) &&
        (maxPrice === "" || priceInINR <= Number(maxPrice))
      );
    });

    if (sort === "low") data.sort((a, b) => a.price - b.price);
    if (sort === "high") data.sort((a, b) => b.price - a.price);

    return data;
  }, [products, search, selectedCategory, minPrice, maxPrice, sort]);

  if (!filteredProducts.length) {
    return <p className="pt-28 text-center">No products found</p>;
  }

  return (
    <div className="pt-28 px-6 pb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
