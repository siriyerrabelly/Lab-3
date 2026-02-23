// Dumb component: shows skeleton while loading
const SkeletonCard = () => {
  return (
    <div className="product-card skeleton">
      <div className="image-placeholder"></div>
      <div className="text-placeholder title"></div>
      <div className="text-placeholder price"></div>
    </div>
  );
};

export default SkeletonCard;
