import NavigationBar from "@/components/shared/NavigationBar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {

  return (
    <NavigationBar>
      <Component {...pageProps} />
    </NavigationBar>
  );
}
