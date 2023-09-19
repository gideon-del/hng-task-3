import logo from "@/public/assets/logo.png";
import background from "@/public/assets/login_bg.jpg";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { toaster } from "@/utils/toaster";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
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
    if (value.trim().length < 6) {
      return "Password must be greater than or equal to 6 characters";
    }
  };
  const submitHandler = async (data) => {
    try {
      setLoading(true);
      console.log(data);
      const res = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log(res.user);
    } catch (error) {
      if (error.message.includes("auth/invalid-login-credentials")) {
        toaster({
          state: "error",
          message: "Invalid credentials. Check your email or password",
        });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="w-screen min-h-screen overflow-x-hidden flex ">
      <div
        className="basis-3/5 hidden md:block"
        style={{
          backgroundImage: `url(${background.src})`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <section className="flex flex-col justify-center flex-1 overflow-hidden">
        <div className=" max-w-sm mx-auto  w-[90%] flex flex-col gap-3">
          <figure className="mx-auto w-fit">
            <Image src={logo} alt="Snap Shot Hub" width={50} height={50} />
          </figure>
          <h1 className="font-bold text-black/40 lg:text-xl text-center capitalize">
            Welcome Back
          </h1>

          <form
            className="flex flex-col gap-3 font-semibold"
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
                className="border border-gray-300 rounded-md p-2 transition"
                placeholder="Your Email"
              />
              {errors.email && (
                <p className="text-red-700">{errors.email.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  validate: validatePassword,
                })}
                placeholder="Your Password"
                className="border border-gray-300 rounded-md p-2 transition"
              />
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
        </div>
      </section>
    </main>
  );
};
export default Login;
