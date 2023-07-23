import { useState, useEffect } from "react";

function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(null);

  useEffect(() => {
    const dark_mode = localStorage.getItem("dark_mode") === "true";
    setIsDarkMode(dark_mode);
    if (dark_mode) {
      toggleDarkMode();
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
      className="top-4 right-4 p-2 rounded-full bg-gray-300 dark:bg-gray-700"
    >
      {isDarkMode ? "Light" : "Dark"} Mode
    </button>
  );
}

export default DarkModeToggle;
