import "globals.css";
import { Poppins } from "next/font/google";
import ColorsProvider from "../utils/ColorsProvider";
import UserColorsProvider from "../utils/UserColorsProvider";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${poppins.style.fontFamily};
        }
      `}</style>
      <ColorsProvider>
        <UserColorsProvider>
          <Component {...pageProps} />
        </UserColorsProvider>
      </ColorsProvider>
    </>
  );
}
