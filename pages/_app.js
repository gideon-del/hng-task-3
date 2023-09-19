import Loader from "@/components/loader";
import UserProvider, { useAuth } from "@/context/user";
import "@/styles/globals.css";
import { Montserrat } from "next/font/google";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const montserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});
export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <div className={`${montserrat.className} font-montserrat bg-black`}>
        <Component {...pageProps} />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </UserProvider>
  );
}
