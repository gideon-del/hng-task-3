import Loader from "@/components/loader";
import Login from "@/components/login";
import { useAuth } from "@/context/user";
import { app } from "@/utils/firebase";
import { getAuth } from "firebase/auth";
import Image from "next/image";
import { useState, useEffect } from "react";
import logo from "@/public/assets/logo.png";
import { BiLogOut } from "react-icons/bi";
import Masonry from "react-masonry-css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import GridLayout from "react-grid-layout";
import Grid from "@/components/grid";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Mobile from "@/components/mobile";
import Desktop from "@/components/desktop";

export default function Home() {
  const [isAuth, setIsAuth] = useState(false);
  const { user, loading } = useAuth();
  const [device, setDevice] = useState(300);
  useEffect(() => {
    setDevice(window.innerWidth);
  }, []);
  return (
    <>
      <header className="bg-white/10">
        <div className="flex justify-between items-center py-2 max-w-7xl mx-auto">
          <figure>
            <Image src={logo} alt="Snap Shot" width={40} height={40} />
          </figure>
          <form className="basis-3/5">
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
      <main>
        <section>
          <h1>Gallery</h1>
          {device < 769 ? <Mobile /> : <Desktop />}
          {/* <Mobile /> */}
        </section>
      </main>
    </>
  );
}

// export function getServerSideProps() {
//   const auth = getAuth(app);
//   if (auth.currentUser === null) {
//     return {
//       props: {
//         user: null,
//       },
//     };
//   }
//   return {
//     props: {
//       user: auth.currentUser,
//     },
//   };
// }
