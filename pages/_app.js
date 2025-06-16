import "./globals.css";
import { AppContextProvider } from "../src/contexts/AppContext";
import Layout from "../src/components/Layout";
import Script from 'next/script';

function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <Script
        id="adsense-script"
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5495811870853736"
        crossOrigin="anonymous"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('AdSense script loaded globally');
        }}
        onError={(e) => {
          console.error('Error loading AdSense script globally:', e);
        }}
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContextProvider>
  );
}

export default MyApp;
