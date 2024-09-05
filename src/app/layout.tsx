import "~/styles/globals.css";

import { type Metadata } from "next";

import React from "react";
import { TRPCReactProvider } from "~/trpc/react";
import { departureMono } from "./fonts";

export const metadata: Metadata = {
  title: ".cursorrules generator",
  description: "generates .cursorrules files for your repositories",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={departureMono.variable}>
      <body className={departureMono.className}>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
