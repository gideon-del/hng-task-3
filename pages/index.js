import Login from "@/components/login";
import Gallery from "@/components/gallery";
import { useUser } from "@clerk/nextjs";
import Loader from "@/components/loader";

export default function Home() {
  const { isLoaded, user } = useUser();

  return (
    <>
      {!isLoaded && <Loader />}
      {user ? <Gallery /> : <Login />}
    </>
  );
}
