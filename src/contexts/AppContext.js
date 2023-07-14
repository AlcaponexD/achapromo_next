import { createContext, useState } from "react";

const AppContext = createContext({});

export function AppContextProvider({ children }) {
  const [data, setData] = useState({});

  function handleData(value) {
    setData({
      ...data,
      ...value,
    });
    console.log(data);
  }

  return (
    <AppContext.Provider
      value={{
        data,
        handleData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
