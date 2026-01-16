import { ProductItem } from "@/types";
import ProductCard from "./ProductCard";

const ProductsContainer = ({ products }: { products: ProductItem[] }) => {

  if (products.length === 0) {
    return <p className="text-center font-bold">No hay productos disponibles</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsContainer;
