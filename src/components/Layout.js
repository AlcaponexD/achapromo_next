import React from "react";
import Script from "next/script";
import Sidebar from "../components/sidebar/menu";
import useAppData from "../hooks/useAppData";
import Cabecalho from "./cabecalho";
import Footer from "./footer/Footer";
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
      <Script
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5495811870853736"
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
      <Script
        id="clarity-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "qb04udhg2b");
          `,
        }}
      />
      <Footer />
    </div>
  );
};

export default Layout;