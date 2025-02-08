import React from "react";
import Sidebar from "../components/sidebar/menu";
import useAppData from "../hooks/useAppData";
import Cabecalho from "./cabecalho";
import { GoogleAnalytics } from '@next/third-parties/google'

const Layout = ({ children }) => {
  const { data } = useAppData();
  return (
    <div className="flex flex-wrap relative text-light-text dark:text-dark-text bg-light-background dark:bg-dark-background h-full">
      <Sidebar isOpen={data.sidebar_open} />
      <Cabecalho />
      <main className="container mx-auto min-h-screen p-3 px-6 flex justify-center">
        {children}
      </main>
      <GoogleAnalytics gaId="G-9M1H3KBJLE" />

    </div>
  );
};

export default Layout;