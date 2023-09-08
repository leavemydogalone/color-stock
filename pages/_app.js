import "globals.css";
import ColorsProvider from "../utils/ColorsProvider";

export default function MyApp({ Component, pageProps }) {
  return (
    <ColorsProvider>
      <Component {...pageProps} />
    </ColorsProvider>
  );
}
