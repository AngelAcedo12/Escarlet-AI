
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Script from "next/script";
import Navbar from "./Components/navbar";
import { Icon, Icons } from "next/dist/lib/metadata/types/metadata-types";
import { useEffect } from "react";
import { ChatProvider } from "./Components/context/chatContext";

const inter = Inter({ subsets: ["latin"] });
const icons : Icon[] = [
  {
    url: "/favicon.ico",
    type: "image/x-icon",
  }

]




const metadata: Metadata = {

  title: "Create Next App",
  description: "Generated by create next app",
  manifest: "/manifest.json",
  icons: icons,
  

};  
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (

    <html lang="esp" className=" text-white scroll-smooth h-full" >
     <head>
      <link rel="manifest" href="/manifest.json" />
     </head>
        
      <body  className={inter.className }  > 
      <ChatProvider>
      {children}
      </ChatProvider>   
      </body>
        
         
      
      
    </html>
  );
}
