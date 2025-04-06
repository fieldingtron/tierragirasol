import React from "react";
import { tinaField, useTina } from "tinacms/dist/react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const HeroSection = ({ props, locale }) => {
  return (
    <section
      id="home"
      className={`${poppins.className} relative min-h-[100vh] flex items-center justify-center bg-cover bg-scroll bg-center`}
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url("${props.landingImageSrc}")`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto px-4 text-center">
        <div className="py-16">
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-4 capitalize"
            data-aos="slide-up"
            data-aos-offset="120"
            data-aos-delay="0"
            data-aos-duration="400"
            data-aos-easing="ease-in-out"
            data-aos-once="true"
          >
            <div data-tina-field={tinaField(props, "herotagline1")}>
              {props.herotagline1[locale]}
            </div>
          </h1>
          <p
            className="text-lg md:text-2xl text-gray-300 mb-8 capitalize"
            data-aos="slide-up"
            data-aos-offset="120"
            data-aos-delay="50"
            data-aos-duration="400"
            data-aos-easing="ease-in-out"
            data-aos-once="true"
            data-tina-field={tinaField(props, "herotagline2")}
          >
            {props.herotagline2[locale]}
          </p>
          <div
            data-aos="slide-up"
            data-aos-offset="120"
            data-aos-delay="150"
            data-aos-duration="400"
            data-aos-easing="ease-in-out"
            data-aos-once="true"
          >
            <a
              href="#services"
              className="inline-block px-8 py-4 bg-green-500 text-white font-semibold rounded shadow hover:bg-green-600 transition uppercase"
              data-tina-field={tinaField(props, "herobuttontext")}
            >
              {props.herobuttontext[locale]}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
