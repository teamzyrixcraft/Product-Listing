const BASE_URL = "https://dummyjson.com/products";

export const fetchProducts = async () => {
  const res = await fetch(BASE_URL);
//   console.log(res.json());
  return res.json();
};

export const fetchProductById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
//   console.log(res.json());
  return res.json();
};
