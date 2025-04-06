import Head from "next/head";
import NavBar from "./NavBar";
import Script from "next/script";
import Contact from "./Contact";
import HeroSection from "./Herosection";
import Footerz from "./Footerz"
import EventsSection from "./EventsSection";
import ServicesSection from "./ServicesSection";
import FAQ from "./FAQ";
import Fotos from "./Fotos";
import Testimonials from "./Testimonials";
import ModalTours from "./ModalTours";
import ModalEvents from "./ModalEvents";

export const HomepageLayout = ({ props, locale }) => {
  // console.log("props");
  //console.log(locale);
  return (
    <>
      <Head>
        <title>Tierra Girasol</title>
        <meta
          name="description"
          content="Connection with Nature in the paradise of Futaleufu Chile"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>

      <NavBar props={props} locale={locale} />
      <HeroSection props={props} locale={locale} />
      <EventsSection props={props} locale={locale} />
      <ServicesSection props={props} locale={locale} />
      <Fotos props={props} locale={locale} />
      <Testimonials props={props} locale={locale} />
      <FAQ props={props} locale={locale} />

      <Contact locale={locale} />
      <ModalTours props={props} locale={locale} />
      <ModalEvents props={{ events: props.events }} locale={locale} />
      <Footerz/>

      </main>


      <Script src="/js/tw-elements.umd.min.js" strategy="lazyOnload" />
    </>
  );
};
