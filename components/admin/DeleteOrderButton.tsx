"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteOrder } from "@/actions/admin/delete-order";

interface Props {
  orderId: string;
}

export default function DeleteOrderButton({ orderId }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `¿Seguro que querés borrar la orden #${orderId}? Esta acción no se puede deshacer.`
    );

    if (!confirmed) return;

    setIsDeleting(true);

    try {
      await deleteOrder(orderId);
      toast.success("Orden borrada correctamente");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Error al borrar la orden");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="btn btn-error btn-sm"
    >
      {isDeleting ? (
        <span className="loading loading-spinner loading-sm"></span>
      ) : (
        "Borrar orden"
      )}
    </button>
  );
}
