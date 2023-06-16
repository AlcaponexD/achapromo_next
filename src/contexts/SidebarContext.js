import { createContext, useState } from "react";

const SidebarContext = createContext({});

export function SideBarContextProvider({ children }) {
  const [open, setValor] = useState(0);

  function toogleSideBar() {
    setValor(open == 1 ? 0 : 1);
  }

  return (
    <SidebarContext.Provider
      value={{
        open,
        toogleSideBar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export default SidebarContext;
