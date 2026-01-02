import { ProductItem } from "@/types";
import ProductCard from "./ProductCard";

const ProductsContainer = ({ products }: { products: ProductItem[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsContainer;
