"use client";

import { registerUser } from "@/actions/auth/register-user";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const { ok, message } = await registerUser({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    if (!ok) {
      toast.error(message);
      return;
    }

    window.location.replace("/");
  };

  return (
    <form className="fieldset" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="label">Nombre completo</label>
        <input
          type="text"
          className="input outline-none"
          placeholder="Nombre completo"
          {...register("name", { required: true })}
        />
      </div>
      <div>
        <label className="label">Email</label>
        <input
          type="email"
          className="input outline-none"
          placeholder="Email"
          {...register("email", { required: true })}
        />
      </div>
      <div>
        <label className="label">Contraseña</label>
        <input
          type="password"
          className="input outline-none"
          placeholder="Contraseña"
          {...register("password", { required: true })}
        />
      </div>

      <button disabled={isSubmitting} className="btn btn-neutral mt-4 w-full">
        {isSubmitting ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          "Registrarme"
        )}
      </button>
    </form>
  );
};

export default RegisterForm;
