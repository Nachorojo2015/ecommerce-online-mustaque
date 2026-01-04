"use client";

import { useCheckout } from "@/store/checkout-store";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface FormData {
  fullname: string;
  address: string;
  address2?: string;
  postalCode: string;
  city: string;
  country: string;
  phone: string;
}

const AddressForm = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const stored = useCheckout((state) => state);
  const setCheckoutData = useCheckout((state) => state.setCheckoutData);

  const onSubmit = async (data: FormData) => {
    setCheckoutData({
      fullname: data.fullname,
      address: data.address,
      address2: data.address2,
      postalCode: data.postalCode,
      city: data.city,
      country: data.country,
      phone: data.phone,
    });

    redirect('/checkout');
  };

  useEffect(() => {
    reset({
      fullname: stored.fullname,
      address: stored.address,
      address2: stored.address2,
      postalCode: stored.postalCode,
      city: stored.city,
      country: stored.country,
      phone: stored.phone,
    });
  }, [stored, reset]);

  return (
    <form
      className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center mt-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col">
        <label className="label">Nombre completo</label>
        <input
          type="text"
          placeholder="Nombre completo"
          className="input w-full outline-none"
          {...register("fullname", { required: true })}
        />
      </div>

      <div className="flex flex-col">
        <label className="label">Direccion de envio</label>
        <input
          type="text"
          placeholder="Direccion de envio"
          className="input w-full outline-none"
          {...register("address", { required: true })}
        />
      </div>

      <div className="flex flex-col">
        <label className="label">Direccion de envio 2 (opcional)</label>
        <input
          type="text"
          placeholder="Direccion de envio 2 (opcional)"
          className="input w-full outline-none"
          {...register("address2")}
        />
      </div>

      <div className="flex flex-col">
        <label className="label">Codigo postal</label>
        <input
          type="text"
          placeholder="Codigo postal"
          className="input w-full outline-none"
          {...register("postalCode", { required: true })}
        />
      </div>

      <div className="flex flex-col">
        <label className="label">Ciudad</label>
        <input
          type="text"
          placeholder="Ciudad"
          className="input w-full outline-none"
          {...register("city", { required: true })}
        />
      </div>

      <div className="flex flex-col">
        <label className="label">País</label>
        <input
          type="text"
          placeholder="País"
          className="input w-full outline-none"
          {...register("country", { required: true })}
        />
      </div>

      <div className="flex flex-col">
        <label className="label">Teléfono</label>
        <input
          type="text"
          placeholder="Teléfono"
          className="input w-full outline-none"
          {...register("phone", { required: true })}
        />
      </div>

      <div></div>

      <button className="btn btn-neutral">Continuar</button>
    </form>
  );
};

export default AddressForm;
