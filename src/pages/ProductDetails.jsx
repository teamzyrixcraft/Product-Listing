import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) {
    return <p className="pt-28 text-center">Loading product...</p>;
  }

  return (
    <div className="pt-28 p-6 max-w-4xl mx-auto">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-80 object-cover rounded"
      />
      <h1 className="text-2xl font-bold mt-4">{product.title}</h1>
      <p className="text-gray-600 mt-2">{product.description}</p>
      <p className="text-xl font-bold mt-3">₹{product.price}</p>
      <p className="mt-1 capitalize text-gray-500">{product.category}</p>
    </div>
  );
};

export default ProductDetails;
