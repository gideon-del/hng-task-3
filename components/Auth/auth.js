import logo from "@/public/assets/logo.png";
import background from "@/public/assets/login_bg.jpg";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toaster } from "@/utils/toaster";
import { useSignIn } from "@clerk/nextjs";
import Loader from "../loader";
import Link from "next/link";
import Login from "./login";
import SignUp from "./signup";

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const toggleLogin = () => {
    setIsLogin((prev) => !prev);
  };
  const AuthCompononent = isLogin ? Login : SignUp;
  const validateEmail = (value) => {
    const emailPattern =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (value.trim().length === 0) {
      return "This field is required";
    }
    if (!value.match(emailPattern)) {
      return "This is a wrong pattern";
    }
  };
  const validatePassword = (value) => {
    if (value.trim().length === 0) {
      return "This field is required";
    }
    if (value.trim().length < 8) {
      return "Password must be greater than or equal to 8 characters";
    }
  };
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
  return (
    <>
      {loading && <Loader />}
      <main className="w-screen min-h-screen overflow-x-hidden flex ">
        <div
          className="basis-3/5 hidden md:block"
          style={{
            backgroundImage: `url(${background.src})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <section className="flex flex-col justify-center  flex-1 overflow-hidden">
          <div className=" max-w-sm mx-auto  w-[90%] flex flex-col gap-3">
            <AuthCompononent
              {...{ validateEmail, validatePassword, setLoading, loading }}
            />
            <p className="text-blue-700 text-center font-semibold ">
              <Link href={"/gallery"}>Browse as Guest</Link>
            </p>
            <p
              className="underline text-center text-blue-700 font-bold cursor-pointer"
              onClick={toggleLogin}
            >
              {isLogin ? "Create an Account" : "Log in to account"}
            </p>
          </div>
        </section>
      </main>
    </>
  );
};
export default Auth;
