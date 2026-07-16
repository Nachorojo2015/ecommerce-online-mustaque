"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteProduct } from "@/actions/admin/delete-product";

interface Props {
  productId: string;
  productTitle: string;
}

export default function DeleteProductButton({ productId, productTitle }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `¿Seguro que querés borrar "${productTitle}"? Esta acción no se puede deshacer.`
    );

    if (!confirmed) return;

    setIsDeleting(true);

    try {
      await deleteProduct(productId);
      toast.success("Producto borrado correctamente");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Error al borrar el producto");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="btn btn-error btn-sm w-full"
    >
      {isDeleting ? (
        <span className="loading loading-spinner loading-sm"></span>
      ) : (
        "Borrar"
      )}
    </button>
  );
}
