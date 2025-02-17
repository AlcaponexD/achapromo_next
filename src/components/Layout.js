import React from "react";
import Sidebar from "../components/sidebar/menu";
import useAppData from "../hooks/useAppData";
import Cabecalho from "./cabecalho";
import { GoogleAnalytics } from '@next/third-parties/google'

const Layout = ({ children }) => {
  const { data } = useAppData();
  return (
    <div className="flex flex-wrap relative text-light-text dark:text-dark-text bg-light-background dark:bg-dark-background h-full">
      {/* Google Tag Manager (noscript) */}
      < noscript >
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-KLK5JJX3"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        ></iframe>
      </noscript >
      <Sidebar isOpen={data.sidebar_open} />
      <Cabecalho />
      <main className="container mx-auto min-h-screen p-3 px-6 flex justify-center">
        {children}
      </main>
      <GoogleAnalytics gaId="G-9M1H3KBJLE" />
      <div className="flex justify-center w-full p-3 text-sm">
        <span>
          Achapromo @ 2025 - Seu site para promos de hardware e periféricos de informática
        </span>
        <a
          className="ml-2" href="mailto:contatoachapromo@gmail.com">contatoachapromo@gmail.com</a>

      </div>
    </div>
  );
};

export default Layout;