import React, { useEffect } from "react";
import Sidebar from "../components/sidebar/menu";
import useAppData from "../hooks/useAppData";
import Cabecalho from "./cabecalho";
import Footer from "./footer/Footer";
import { GoogleAnalytics } from '@next/third-parties/google'
import { clarity } from '@microsoft/clarity'

const Layout = ({ children }) => {
  const { data } = useAppData();

  useEffect(() => {
    // Initialize Microsoft Clarity
    clarity.init('qb04udhg2b');
  }, []);

  return (
    <div className="flex flex-wrap relative text-light-text dark:text-dark-text bg-light-background dark:bg-dark-background h-full">
      <Sidebar isOpen={data.sidebar_open} />
      <Cabecalho />
      <main className="container mx-auto min-h-screen p-3 px-6 flex justify-center">
        {children}
      </main>
      <GoogleAnalytics gaId="G-9M1H3KBJLE" />
      <Footer />
    </div>
  );
};

export default Layout;