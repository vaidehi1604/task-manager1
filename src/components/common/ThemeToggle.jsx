import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useTheme } from "../../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors"
    >
      {theme === "light" ? (
        <MoonIcon className="w-6 h-6 text-gray-800 dark:text-gray-200" />
      ) : (
        <SunIcon className="w-6 h-6 text-yellow-400 dark:text-yellow-300" />
      )}
    </button>
  );
};

export default ThemeToggle;
