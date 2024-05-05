import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ChakraProvider } from "@chakra-ui/react";
import "./globals.css";
import ReduxProvider from "@/providers/ReduxProvider";
import Authenticator from "@/providers/Authenticator";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Secure Account Dashboard",
  description: "Secure account dashboard is an application where users can log in, log out, and view their login history. Additionally, the system also supports real-time monitoring of user activities, two-factor authentication (2FA) for enhanced security, and users can manage their devices and access.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <Authenticator>
            <ChakraProvider>{children}</ChakraProvider>
          </Authenticator>
        </ReduxProvider>
      </body>
    </html>
  );
}
