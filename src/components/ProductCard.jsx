import { Link } from "react-router-dom";

const USDtoINR = 90;
const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`}>
      <div className="border rounded-lg p-4 hover:shadow-lg transition cursor-pointer">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-40 w-full object-cover rounded"
        />
        <h3 className="mt-2 font-semibold">{product.title}</h3>
        <p className="text-sm text-gray-500 capitalize">{product.category}</p>
        <p className="font-bold mt-1">₹{Math.floor(product.price * USDtoINR)}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
