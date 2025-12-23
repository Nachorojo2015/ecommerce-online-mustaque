import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    urlImage: "/image.png",
    title: "Remeron fear god",
    price: 28000,
  },
];

const ProductsContainer = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          urlImage={product.urlImage}
          title={product.title}
          price={product.price}
        />
      ))}
    </div>
  );
};

export default ProductsContainer;
