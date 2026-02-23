import { useState, useEffect } from "react";
import ProductCard from "./components/ProductCard.jsx";
import SkeletonCard from "./components/SkeletonCard.jsx";

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Closure to track fetch attempts
  const fetchTracker = (() => {
    let attempts = 0;
    return {
      increment: () => ++attempts,
      getAttempts: () => attempts
    };
  })();

  const fetchProducts = async () => {
    fetchTracker.increment();
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      setProducts(data.products); // update state
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Product Listing</h1>
      <p>Fetch attempts: {fetchTracker.getAttempts()}</p>

      <div className="products-grid">
        {loading
          ? Array.from({ length: 10 }).map((_, idx) => (
              <SkeletonCard key={idx} />
            ))
          : products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </div>
  );
};

export default App;

