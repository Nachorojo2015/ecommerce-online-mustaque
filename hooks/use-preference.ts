import { createPreference } from "@/actions/mercadopago/create-preference";
import { OrderItem } from "@/types";
import { useEffect, useState } from "react"

interface Parameters {
  items?: OrderItem[];
  orderId?: string;
  existingPreferenceId?: string | null;
}

export const usePreference = ({ items, orderId, existingPreferenceId }: Parameters) => {
    const [createdPreferenceId, setCreatedPreferenceId] = useState<string | null>();
    const [loader, setLoader] = useState<boolean>(false);

    useEffect(() => {
      // La orden ya tiene una preferencia creada (order.preference_id): se usa
      // directo, sin pegarle de nuevo al server action en cada visita.
      if (existingPreferenceId) return;

      const getPreference = async () => {
        if (!items) return;
        if (!orderId) return;

        setLoader(true);

        const preferenceId = await createPreference({ items, orderId });

        setLoader(false);

        setCreatedPreferenceId(preferenceId);
      }

      getPreference();
    }, [items, orderId, existingPreferenceId]);

    return { loader, preferenceId: existingPreferenceId ?? createdPreferenceId }

}