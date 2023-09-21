import Auth from "@/components/Auth/auth";
import Gallery from "@/components/Gallery/gallery";
import { useUser } from "@clerk/nextjs";
import Loader from "@/components/loader";

export default function Home() {
  const { isLoaded, user } = useUser();

  return (
    <>
      {!isLoaded && <Loader />}
      {user ? <Gallery /> : <Auth />}
    </>
  );
}
