import { BrowserRouter, Routes, Route, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";

function AppContent() {
  const [products, setProducts] = useState([]);

  const categories = ["groceries", "beauty", "fragrances", "furniture"];

  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const selectedCategory = searchParams.get("category") || "all";

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then(res => res.json())
      .then(data => setProducts(data.products));
  }, []);

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
