import Login from "@/components/login";
import { useAuth } from "@/context/user";

import Image from "next/image";
import { useState, useEffect } from "react";
import logo from "@/public/assets/logo.png";
import { BiLogOut } from "react-icons/bi";

import Grid from "@/components/grid";
import Header from "@/components/header";

export default function Home() {
  const [isAuth, setIsAuth] = useState(false);
  const { user, loading } = useAuth();
  const [device, setDevice] = useState(300);

  useEffect(() => {
    setDevice(window.innerWidth);
  }, []);
  return (
    <>
      <Header />
      <main>
        <section>
          <h1>Gallery</h1>
          <Grid />
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
