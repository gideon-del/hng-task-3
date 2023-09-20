import Login from "@/components/login";
import { useAuth } from "@/context/user";

import Image from "next/image";
import { useState, useEffect } from "react";
import logo from "@/public/assets/logo.png";
import { BiLogOut } from "react-icons/bi";

import Grid from "@/components/grid";
import Header from "@/components/header";
import Gallery from "@/components/gallery";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useUser } from "@clerk/nextjs";
import Loader from "@/components/loader";

export default function Home() {
  const [isAuth, setIsAuth] = useState(false);
  // const { user, loading, logOut, login } = useAuth();
  const [device, setDevice] = useState(300);
  const { isSignedIn, isLoaded } = useUser();

  return (
    <>
      {!isLoaded && <Loader />}
      {!isSignedIn ? <Login /> : <Gallery />}
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
