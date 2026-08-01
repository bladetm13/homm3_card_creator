import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import StoreProvider from "./StoreProvider";
import Toaster from "@/components/Toaster";
config.autoAddCss = false;

const liberationSerif = localFont({
  src: [
    {
      path: "../assets/fonts/LiberationSerif-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/LiberationSerif-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/LiberationSerif-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../assets/fonts/LiberationSerif-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-liberation-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Card Creator",
  description: "Card Creator - Heroes 3 Board Game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={liberationSerif.variable}>
      <head>
        <link rel="icon" href="images/initiative.png" type="image/png" />
      </head>
      <body>
        <StoreProvider>{children}</StoreProvider>
        <Toaster />
      </body>
    </html>
  );
}
