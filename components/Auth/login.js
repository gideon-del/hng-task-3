import { useSignIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import logo from "@/public/assets/logo.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toaster } from "@/utils/toaster";
const Login = ({ setLoading, loading, validateEmail, validatePassword }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { signIn, isLoaded, setActive } = useSignIn();
  const [showPassword, setShowPassword] = useState(false);
  const submitHandler = async (data) => {
    try {
      setLoading(true);
      if (!isLoaded) {
        return;
      }
      const res = await signIn.create({
        identifier: data.email,
        password: data.password,
      });
      await setActive({ session: res.createdSessionId });
      toaster({ state: "success", message: "Welcome" });
    } catch (error) {
      toaster({
        state: "error",
        message: "Invalid credentials. Check your email or password",
      });
    } finally {
      setLoading(false);
    }
  };
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <>
      <figure className="mx-auto w-fit bg-white">
        <Image src={logo} alt="Snap Shot Hub" width={50} height={50} />
      </figure>
      <h1 className="font-bold text-white/80 lg:text-xl text-center capitalize">
        Welcome Back
      </h1>

      <form
        className="flex flex-col gap-3 font-semibold text-white/90"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            {...register("email", {
              validate: validateEmail,
            })}
            className="border border-gray-900 rounded-md p-2 transition text-black focus-within:outline-gray-700"
            placeholder="Your Email"
          />
          {errors.email && (
            <p className="text-red-700">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <div className="border border-gray-300 rounded-md p-2 transition gap-4 text-black bg-white flex justify-between focus-within:outline focus-within:outline-gray-700">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password", {
                validate: validatePassword,
              })}
              placeholder="Your Password"
              className="flex-1 focus-within:outline-none"
            />
            <button
              type="button"
              className="text-2xl"
              onClick={toggleShowPassword}
            >
              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-700">{errors.password.message}</p>
          )}
        </div>
        <button
          className={`bg-blue-900 font-bold after:absolute relative after:inset-0 disabled:after:bg-black/20 px-4 overflow-hidden py-2 rounded-md items-stretch w-full text-white disabled:cursor-not-allowed`}
          disabled={loading}
        >
          Log in
        </button>
      </form>
    </>
  );
};

export default Login;
