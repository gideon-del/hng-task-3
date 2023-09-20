import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Montserrat } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const montserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});
export default function App({ Component, pageProps }) {
  return (
    <ClerkProvider {...pageProps}>
      <div
        className={`${montserrat.className} font-montserrat bg-black min-h-screen flex flex-col gap-4 overflow-y-scroll`}
      >
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
    </ClerkProvider>
  );
}
