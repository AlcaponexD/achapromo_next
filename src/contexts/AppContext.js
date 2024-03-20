import { createContext, useState } from "react";
import { toast } from "react-toastify";

const AppContext = createContext({});

export function AppContextProvider({ children }) {
  function notify(message) {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  function notify_error(message) {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  const [data, setData] = useState({
    notify,
    notify_error,
  });

  function handleData(value) {
    setData({
      ...data,
      ...value,
    });
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
