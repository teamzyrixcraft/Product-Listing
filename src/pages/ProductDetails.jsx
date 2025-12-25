import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductById, fetchProductsByCategory, } from "../services/api";

const INR_RATE = 1;

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [activeImage, setActiveImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);

      const productData = await fetchProductById(id);
      setProduct(productData);
      setActiveImage(productData.thumbnail);

      const categoryData = await fetchProductsByCategory(
        productData.category
      );

      setSimilarProducts(
        categoryData.products.filter(p => p.id !== productData.id)
      );

      setLoading(false);
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return <p className="pt-28 text-center">Loading product details...</p>;
  }

  if (!product) {
    return <p className="pt-28 text-center">Product not found</p>;
  }

  return (
    <div className="pt-28 px-6 pb-10 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <div>
          <div className="w-full h-[420px] bg-gray-50 border rounded-lg flex items-center justify-center">
            <img
              src={activeImage}
              alt={product.title}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          <div className="flex gap-2 mt-4 overflow-x-scroll scrollbar-hide">
            {product.images?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                onClick={() => setActiveImage(img)}
                className={`h-20 w-20 border rounded cursor-pointer transition
                  ${
                    activeImage === img
                      ? "ring-2 ring-blue-500"
                      : "hover:scale-105"
                  }`}
              />
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>

          <p className="text-gray-500 mt-1 capitalize">
            Brand: <span className="font-medium">{product.brand}</span>
          </p>

          <p className="text-gray-500 capitalize">
            Category: <span className="font-medium">{product.category}</span>
          </p>

          <div className="mt-4 text-3xl font-bold text-green-600">
            ₹{(product.price * INR_RATE).toLocaleString("en-IN")}
          </div>

          <p className="mt-4 text-gray-700">{product.description}</p>
        </div>
      </div>

      {similarProducts.length > 0 && (
        <div className="mt-14">
          <h2 className="text-2xl font-bold mb-4">Similar Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {similarProducts.map(item => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className="border rounded-lg p-4 hover:shadow-lg transition"
              >
                <img
                  src={item.thumbnail}
                  className="h-40 w-full object-cover rounded"
                />
                <h3 className="mt-2 font-semibold text-sm">{item.title}</h3>
                <p className="font-bold mt-1">
                  ₹{(item.price * INR_RATE).toLocaleString("en-IN")}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
