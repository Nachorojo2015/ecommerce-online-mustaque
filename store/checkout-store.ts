import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CheckoutStore {
  fullname: string;
  address: string;
  address2?: string;
  postalCode: string;
  city: string;
  country: string;
  phone: string;

  setCheckoutData: (data: Partial<CheckoutStore>) => void;
}

export const useCheckout = create<CheckoutStore>()(
  persist(
    (set) => ({
      fullname: "",
      address: "",
      address2: "",
      postalCode: "",
      city: "",
      country: "",
      phone: "",

      setCheckoutData: (data) =>
        set((state) => ({
          ...state,
          ...data,
        })),
    }),
    {
      name: "checkout-data",
    }
  )
);
