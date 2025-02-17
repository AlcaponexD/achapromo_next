import "./globals.css";
import { AppContextProvider } from "../src/contexts/AppContext";
import Layout from "../src/components/Layout";
function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContextProvider>
  );
}

export default MyApp;
