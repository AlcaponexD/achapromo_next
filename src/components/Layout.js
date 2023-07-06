import React from "react";
import Sidebar from "../components/sidebar/menu";
import useSideBarData from "../hooks/useSideBarData";
import Cabecalho from "./cabecalho";

const Layout = ({ children }) => {
  const { open } = useSideBarData();
  return (
    <div className="flex text-light-text dark:text-dark-text bg-light-background dark:bg-dark-background h-full">
      <Sidebar isOpen={open} />
      <main className="w-full min-h-screen p-3">
        <Cabecalho />
        {children}
      </main>
    </div>
  );
};

export default Layout;
