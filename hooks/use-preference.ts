import { createPreference } from "@/actions/mercadopago/create-preference";
import { Size } from "@/types";
import { useEffect, useState } from "react"

interface Parameters {
  items?: [
    {
      id: string;
      product_id: string;
      size: Size["size"];
      quantity: number;
      unit_price: number;
      total_price: number;
    }
  ];
  orderId?: string;
}

export const usePreference = ({ items, orderId }: Parameters) => {
    const [preferenceId, setPreferenceId] = useState<string | null>();
    const [loader, setLoader] = useState<boolean>(false);

    useEffect(() => {
      const getPreference = async () => {
        if (!items) return;
        if (!orderId) return;

        setLoader(true);

        const preferenceId = await createPreference({ items, orderId });

        setLoader(false);

        setPreferenceId(preferenceId);
      }

      getPreference();
    }, [items, orderId]);

    return { loader, preferenceId }
    
}