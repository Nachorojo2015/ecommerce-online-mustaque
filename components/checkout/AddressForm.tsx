"use client";

import { useCheckout } from "@/store/checkout-store";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  CiCompass1,
  CiFlag1,
  CiHome,
  CiMail,
  CiMap,
  CiMapPin,
  CiPhone,
  CiUser,
} from "react-icons/ci";
import { IoArrowForward } from "react-icons/io5";

interface FormData {
  fullname: string;
  email: string;
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
      email: data.email,
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
      email: stored.email,
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
      className="card bg-base-100 border border-base-300 shadow-sm mt-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="card-body gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="label">
              <CiUser size={16} />
              Nombre completo
            </label>
            <input
              type="text"
              placeholder="Nombre completo"
              className="input w-full outline-none"
              {...register("fullname", { required: true })}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="label">
              <CiMail size={16} />
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              className="input w-full outline-none"
              {...register("email", { required: true })}
            />
          </div>

          <div className="flex flex-col gap-1 sm:col-span-2">
            <label className="label">
              <CiMapPin size={16} />
              Dirección de envío
            </label>
            <input
              type="text"
              placeholder="Dirección de envío"
              className="input w-full outline-none"
              {...register("address", { required: true })}
            />
          </div>

          <div className="flex flex-col gap-1 sm:col-span-2">
            <label className="label">
              <CiHome size={16} />
              Dirección de envío 2 (opcional)
            </label>
            <input
              type="text"
              placeholder="Dirección de envío 2 (opcional)"
              className="input w-full outline-none"
              {...register("address2")}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="label">
              <CiMap size={16} />
              Código postal
            </label>
            <input
              type="text"
              placeholder="Código postal"
              className="input w-full outline-none"
              {...register("postalCode", { required: true })}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="label">
              <CiCompass1 size={16} />
              Ciudad
            </label>
            <input
              type="text"
              placeholder="Ciudad"
              className="input w-full outline-none"
              {...register("city", { required: true })}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="label">
              <CiFlag1 size={16} />
              País
            </label>
            <input
              type="text"
              placeholder="País"
              className="input w-full outline-none"
              {...register("country", { required: true })}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="label">
              <CiPhone size={16} />
              Teléfono
            </label>
            <input
              type="text"
              placeholder="Teléfono"
              className="input w-full outline-none"
              {...register("phone", { required: true })}
            />
          </div>
        </div>

        <button className="btn btn-neutral w-full gap-2">
          Continuar
          <IoArrowForward size={18} />
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
