import { Html, Head, Main, NextScript } from "next/document";
import { Analytics } from '@vercel/analytics/next';


export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:400,700"
          rel="stylesheet"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="dark:bg-darkBlue dark:text-white  bg-alt1">
        <Main />
        <NextScript />
        <Analytics />

      </body>
    </Html>
  );
}
