import "~/styles/globals.css";

import { type Metadata } from "next";

import { Analytics } from "@vercel/analytics/react";
import React from "react";
import { TRPCReactProvider } from "~/trpc/react";
import { Toaster } from "../components/ui/toaster";
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
    <html lang="en" className={`${departureMono.variable} dark`}>
      <body className={`${departureMono.className} dark`}>
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
