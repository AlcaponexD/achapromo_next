import "./globals.css";
import { SideBarContextProvider } from "../src/contexts/SidebarContext";
import Layout from "../src/components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <SideBarContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SideBarContextProvider>
  );
}

export default MyApp;
