"use client";

import { useCartStore } from "@/store/cart-store";
import { Product } from "@/types";
import { useState } from "react";

const AddProduct = ({ product }: { product: Product }) => {
  const addItem = useCartStore((state) => state.addItem);

  const [size, setSize] = useState("");
  const [sizeErrorMessage, setSizeErrorMessage] = useState<string | null>(null);

  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    if (!size) {
      setSizeErrorMessage("Debe seleccionar un talle");
      return;
    }

    addItem({
      id: product.id,
      image: product.images[0],
      title: product.title,
      price: product.price,
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
    <>
      {sizeErrorMessage && <p className="text-red-500">{sizeErrorMessage}</p>}
      <select defaultValue="Selecciona un talle" className="select">
        <option disabled={true}>Selecciona un talle</option>
        {product.sizes.map((size, index) => (
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

      <div>
        <p>Cantidad</p>
        <div className="flex items-center gap-2">
          <button className="btn" onClick={sum}>
            +
          </button>
          <span>{quantity}</span>
          <button className="btn" onClick={res}>
            -
          </button>
        </div>
      </div>

      <button className="btn btn-neutral sm:w-fit w-full" onClick={addToCart}>
        Agregar al carrito
      </button>
    </>
  );
};

export default AddProduct;
