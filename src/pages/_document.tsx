import { Html, Head, Main, NextScript } from "next/document";

export default function CustomDocument() {
  return (
    <Html className="h-full bg-gray-100">
      <Head />
      <html>
        <body className="h-full">
          <Main />
          <NextScript />
        </body>
      </html>
    </Html>
  );
}
