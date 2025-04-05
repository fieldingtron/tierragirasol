import React from "react";

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
    </>
  );
};

export default App;
