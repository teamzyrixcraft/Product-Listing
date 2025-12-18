import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);

      // Fetch selected product
      const productRes = await fetch(
        `https://dummyjson.com/products/${id}`
      );
      const productData = await productRes.json();
      setProduct(productData);

      // Fetch similar products
      const categoryRes = await fetch(
        `https://dummyjson.com/products/category/${productData.category}`
      );
      const categoryData = await categoryRes.json();

      const filteredSimilar = categoryData.products.filter(
        p => p.id !== productData.id
      );

      setSimilarProducts(filteredSimilar);
      setLoading(false);
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <p className="pt-28 text-center">Loading product details...</p>;
  }

  if (!product) {
    return <p className="pt-28 text-center">Product not found</p>;
  }

  return (
    <div className="pt-28 px-6 pb-10 max-w-6xl mx-auto">

      {/* PRODUCT DETAILS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Image Section */}
        <div>
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-96 object-cover rounded-lg border"
          />

          <div className="flex gap-2 mt-4 overflow-x-auto">
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`product-${index}`}
                className="h-20 w-20 object-cover border rounded cursor-pointer hover:scale-105 transition"
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>

          <p className="text-gray-500 mt-1 capitalize">
            Brand: <span className="font-medium">{product.brand}</span>
          </p>

          <p className="text-gray-500 capitalize">
            Category: <span className="font-medium">{product.category}</span>
          </p>

          {/* Overall Rating */}
          <div className="flex items-center gap-2 mt-3">
            <span className="text-yellow-500 text-lg">⭐</span>
            <span className="font-medium">{product.rating}</span>
            <span className="text-gray-500 text-sm">
              Overall rating
            </span>
          </div>

          {/* Price */}
          <div className="mt-4">
            <span className="text-3xl font-bold text-green-600">
              ₹{product.price}
            </span>
            <span className="ml-3 text-sm text-red-500">
              {product.discountPercentage}% OFF
            </span>
          </div>

          {/* Description */}
          <p className="mt-4 text-gray-700">
            {product.description}
          </p>
        </div>
      </div>

      {/* USER REVIEWS */}
      {product.reviews && product.reviews.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">
            User Reviews
          </h2>

          <div className="space-y-4">
            {product.reviews.map((review, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 bg-gray-50"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">
                    {review.reviewerName || "Anonymous"}
                  </span>
                  {review.rating && (
                    <span className="text-yellow-500 text-sm">
                      ⭐ {review.rating}
                    </span>
                  )}
                </div>

                <p className="text-gray-700 text-sm">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SIMILAR PRODUCTS */}
      {similarProducts.length > 0 && (
        <div className="mt-14">
          <h2 className="text-2xl font-bold mb-4">
            Similar Products
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {similarProducts.map(item => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className="border rounded-lg p-4 hover:shadow-lg transition"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-40 w-full object-cover rounded"
                />
                <h3 className="mt-2 font-semibold text-sm">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 capitalize">
                  {item.category}
                </p>
                <p className="font-bold mt-1">₹{item.price}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default ProductDetails;
