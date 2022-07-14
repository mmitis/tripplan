import { Html, Head, Main, NextScript } from "next/document";

export default function CustomDocument() {
  return (
    <Html className="h-full bg-gray-100">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <html>
        <body className="h-full">
          <Main />
          <NextScript />
        </body>
      </html>
    </Html>
  );
}
