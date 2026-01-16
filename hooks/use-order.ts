import { getOrderById } from "@/actions/orders/get-order-by-id";
import { Order } from "@/types";
import { useEffect, useState } from "react";

export const useOrder = (id?: string) => {
  const [order, setOrder] = useState<Order>();
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    const getOrder = async () => {
      if (!id) return;

      setLoader(true);

      const or = await getOrderById({ id });

      setLoader(false);

      if (!or) return;

      setOrder(or);
    };

    getOrder();
  }, [id]);

  return { loader, order };
};
