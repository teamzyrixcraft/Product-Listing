const BASE_URL = "https://dummyjson.com/products";

export const fetchProducts = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
};

export const fetchProductById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }
  return res.json();
};

export const fetchProductsByCategory = async (category) => {
  const res = await fetch(`${BASE_URL}/category/${category}`);
  if (!res.ok) {
    throw new Error("Failed to fetch category products");
  }
  return res.json();
};
