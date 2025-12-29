import ProductCard from "./ProductCard";

interface Products {
  id: string;
  title: string;
  price: number;
  slug: string;
  images: string[];
}

const ProductsContainer = ({ products }: { products: Products[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          title={product.title}
          price={product.price}
          slug={product.slug}
          images={product.images}
        />
      ))}
    </div>
  );
};

export default ProductsContainer;
