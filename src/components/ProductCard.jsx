import { Link } from "react-router-dom";

const INR_RATE = 1;

const ProductCard = ({ product }) => {
  const priceInINR = product.price * INR_RATE;

  return (
    <Link to={`/product/${product.id}`}>
      <div className="border rounded-lg p-4 hover:shadow-lg transition cursor-pointer">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-40 w-full object-cover rounded"
        />
        <h3 className="mt-2 font-semibold">{product.title}</h3>
        <p className="text-sm text-gray-500 capitalize">
          {product.category}
        </p>
        <p className="font-bold mt-1">
          ₹{priceInINR.toLocaleString("en-IN")}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
