import { useEffect, useState } from "react";
import { fetchProducts } from "../services/api";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data.products);
      setLoading(false);
    });
  }, []);

  return { products, loading };
};
