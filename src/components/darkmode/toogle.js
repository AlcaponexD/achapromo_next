import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(null);

  useEffect(() => {
    // Verifica se existe uma preferência salva no localStorage
    const savedPreference = localStorage.getItem("dark_mode");

    // Se não existir preferência salva, define como true (modo escuro)
    // Se existir, usa a preferência salva
    const dark_mode = savedPreference === null ? true : savedPreference === "true";

    setIsDarkMode(dark_mode);

    // Aplica o modo escuro conforme a preferência
    if (dark_mode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Salva a preferência no localStorage se for a primeira visita
    if (savedPreference === null) {
      localStorage.setItem("dark_mode", true);
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("dark_mode", !isDarkMode);
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="top-4 right-4 p-2 rounded-full bg-gray-300 dark:bg-gray-700 transition-colors duration-200"
      title={isDarkMode ? "Alternar para modo claro" : "Alternar para modo escuro"}
    >
      {isDarkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-blue-500" />}
    </button>
  );
}

export default DarkModeToggle;
