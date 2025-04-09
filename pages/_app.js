import React from "react";

// 🛠 PATCH to fix useLayoutEffect warning during SSR
if (typeof window === "undefined") {
  React.useLayoutEffect = React.useEffect;
}
import { Analytics } from '@vercel/analytics/next';
import "./global.css";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <>
      <Component {...pageProps} />
      <Analytics />

    </>
  );
};

export default App;
