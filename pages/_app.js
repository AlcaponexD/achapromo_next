import "./globals.css";
import { SideBarContextProvider } from "../src/contexts/SidebarContext";

function MyApp({ Component, pageProps }) {
  return (
    <SideBarContextProvider>
      <Component {...pageProps} />
    </SideBarContextProvider>
  );
}

export default MyApp;
