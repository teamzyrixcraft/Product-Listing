import { BrowserRouter, Routes, Route, useSearchParams } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import { useProducts } from "./hooks/useProducts";

function AppContent() {
  const { products, loading, error } = useProducts();

  const categories = ["groceries", "beauty", "fragrances", "furniture"];

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const selectedCategory = searchParams.get("category") || "all";

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("");

  if (loading) {
    return <p className="pt-28 text-center">Loading products...</p>;
  }

  if (error) {
    return <p className="pt-28 text-center text-red-500">{error}</p>;
  }

  return (
    <>
      <Navbar
        products={products}
        categories={categories}
        search={search}
        selectedCategory={selectedCategory}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        sort={sort}
        setSort={setSort}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              products={products}
              search={search}
              selectedCategory={selectedCategory}
              minPrice={minPrice}
              maxPrice={maxPrice}
              sort={sort}
            />
          }
        />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
