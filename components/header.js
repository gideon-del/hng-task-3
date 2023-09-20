import Image from "next/image";
import React from "react";
import { BiLogOut } from "react-icons/bi";
import logo from "@/public/assets/logo.png";
import { useRouter } from "next/router";
import { useClerk, useUser } from "@clerk/nextjs";
import { toaster } from "@/utils/toaster";

const Header = () => {
  const { push, replace } = useRouter();
  const { signOut } = useClerk();
  const { user } = useUser();
  const search = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const { search } = Object.fromEntries(data.entries());
    if (search.trim().length === 0) return;
    push(`/search/${search}`);
  };
  const logout = async () => {
    await signOut();
    toaster({ state: "success", message: "Goodbye" });
    replace("/");
  };
  return (
    <header className="bg-white/10">
      <div className="md:flex justify-between items-center py-2 px-4 max-w-7xl mx-auto header_grid gap-4">
        <figure className="logo">
          <Image src={logo} alt="Snap Shot" width={40} height={40} />
        </figure>
        <form className="basis-3/5 search" onSubmit={search}>
          <input
            type="text"
            name="search"
            placeholder="Search by tag e.g Animal"
            className="border-gray-300 rounded-full px-4 py-2 border w-full placeholder:text-white/30 text-white bg-transparent"
          />
        </form>
        {user ? (
          <button
            className="border border-red-600 text-red-600 font-bold text-center justify-center px-3 py-2 rounded-md flex gap-2 items-center flex-row-reverse text-lg btn"
            onClick={logout}
          >
            Log out
            <span className="hidden md:block">
              <BiLogOut />
            </span>
          </button>
        ) : (
          <button
            className="bg-blue-700  text-white font-bold px-3 justify-center py-2 rounded-md flex gap-2 items-center flex-row-reverse text-lg btn"
            onClick={() => push("/")}
          >
            Log in
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
