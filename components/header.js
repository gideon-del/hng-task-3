import Image from "next/image";
import React from "react";
import { BiLogOut } from "react-icons/bi";
import logo from "@/public/assets/logo.png";
import { useRouter } from "next/router";

const Header = () => {
  const { push } = useRouter();
  const search = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const { search } = Object.fromEntries(data.entries());
    if (search.trim().length === 0) return;
    push(`/search/${search}`);
  };
  return (
    <header className="bg-white/10">
      <div className="flex justify-between items-center py-2 max-w-7xl mx-auto">
        <figure>
          <Image src={logo} alt="Snap Shot" width={40} height={40} />
        </figure>
        <form className="basis-3/5" onSubmit={search}>
          <input
            type="text"
            name="search"
            placeholder="Search by tag e.g Animal"
            className="border-gray-300 rounded-full px-4 py-2 border w-full placeholder:text-white text-white bg-transparent"
          />
        </form>
        <button className="border border-red-600 text-red-600 font-bold px-3 py-2 rounded-md flex gap-2 items-center flex-row-reverse text-lg">
          Log out
          <BiLogOut />
        </button>
      </div>
    </header>
  );
};

export default Header;
