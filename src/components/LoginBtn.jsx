import * as Dialog from "@radix-ui/react-dialog";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { supabase } from "../db/supabaseClient";

const LoginBtn = ({ session, setSession }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let navigate = useNavigate();

  const onSubmit = async (e) => {
    const { email, password } = e;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.log("ERROR", error);
      setErrorMessage(error.message);
    } else {
      console.log("DATA", data);
      setSession(data);
      console.log("EVENTO", e);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="rounded-md bg-zinc-700 px-3 py-1 text-sm font-medium ">
          Login
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-[#433E62] p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="flex items-center justify-center text-2xl  font-medium text-white">
            Login
          </Dialog.Title>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <div className="flex flex-col">
              <label className="text-white" htmlFor="email">
                E-mail
              </label>
              <input
                className="rounded-md border border-[#171524] bg-neutral-200 p-2 outline-none"
                name="email"
                type="email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "O campo de e-mail deve ser preenchido",
                  },
                  pattern: {
                    value: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i,
                    message: "E-mail inválido",
                  },
                })}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-white" htmlFor="senha">
                Senha
              </label>
              <input
                className="rounded-md border border-[#171524] bg-neutral-200 p-2 outline-none"
                name="password"
                type="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Preencha o campo de senha",
                  },
                })}
              />
              {errors.password && (
                <p className="text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex justify-between">
              <a
                href=""
                className="w-fit text-white underline hover:text-neutral-300"
              >
                Esqueci minha senha
              </a>
            </div>
            <button
              className="rounded-md bg-purple-700 p-2 text-white shadow-xl"
              type="submit"
            >
              Entrar
            </button>
            {errorMessage && <div className="text-red-600">{errorMessage}</div>}
          </form>

          <div className="mt-[25px] flex justify-end"></div>
          <Dialog.Close asChild>
            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              X
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default LoginBtn;
