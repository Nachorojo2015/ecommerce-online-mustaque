"use client";

import { useCartStore } from "@/store/cart-store";
import { Product } from "@/types";
import { useState } from "react";

const AddProduct = ({ product }: { product: Product }) => {
  const addItem = useCartStore((state) => state.addItem);

  const [size, setSize] = useState<string>("");
  const [sizeErrorMessage, setSizeErrorMessage] = useState<string | null>(null);

  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    if (size.length === 0 && product.sizes) {
      setSizeErrorMessage("Debe seleccionar un talle");
      return;
    }

    addItem({
      id: product.id,
      image: product.images[0],
      title: product.title,
      price: product.price,
      slug: product.slug,
      size,
      quantity,
    });
  };

  const sum = () => {
    setQuantity((prev) => prev + 1);
  };

  const res = () => {
    if (quantity <= 1) return;
    setQuantity((prev) => prev - 1);
  };

  return (
    <div className="flex w-full flex-col items-center gap-4 sm:items-start">
      {product.sizes && (
        <div className="flex w-full flex-col gap-1 sm:w-auto">
          <label className="text-sm font-medium">Talle</label>
          <select defaultValue="Selecciona un talle" className="select w-full sm:w-40">
            <option disabled={true}>Selecciona un talle</option>
            {product.sizes &&
              product.sizes.map((size, index) => (
                <option
                  key={index}
                  disabled={size.stock <= 0}
                  onClick={() => {
                    setSize(size.size);
                    setSizeErrorMessage(null);
                  }}
                >
                  {size.size}
                </option>
              ))}
          </select>
          {sizeErrorMessage && (
            <p className="text-sm text-error">{sizeErrorMessage}</p>
          )}
        </div>
      )}

      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">Cantidad</p>
        <div className="join">
          <button className="btn join-item" onClick={res}>
            -
          </button>
          <span className="btn join-item pointer-events-none w-12">
            {quantity}
          </span>
          <button className="btn join-item" onClick={sum}>
            +
          </button>
        </div>
      </div>

      <button
        className="btn btn-neutral w-full sm:w-fit sm:min-w-52"
        onClick={addToCart}
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default AddProduct;
