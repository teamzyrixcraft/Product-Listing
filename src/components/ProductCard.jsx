import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`}>
      <div className="border rounded-lg p-4 hover:shadow-lg transition">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-40 w-full object-cover"
        />
        <h3 className="mt-2 font-semibold">{product.title}</h3>
        <p className="text-sm text-gray-500">{product.category}</p>
        <p className="font-bold">₹{product.price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
