// import { createContext, useContext, useEffect, useState } from "react";

// const ThemeContext = createContext();

// export function ThemeProvider({ children }) {
//   const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

//   useEffect(() => {
//     localStorage.setItem("theme", theme);
//     document.documentElement.classList.toggle("dark", theme === "dark");
//     console.log("HTML class:", document.documentElement.className);
//   }, [theme]);

//   const toggleTheme = () => setTheme((prev) => prev === "light" ? "dark" : "light");

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }

// export function useTheme() {
//   return useContext(ThemeContext);
// }

// ******** 2 ********

// import { createContext, useContext, useEffect, useState } from "react";

// const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const stored = localStorage.getItem("theme");
//   const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

//   const initial = stored || (prefersDark ? "dark" : "light");

//   const [theme, setTheme] = useState(initial);

//   useEffect(() => {
//     localStorage.setItem("theme", theme);

//     // Remove previous theme classes and apply the current one
//     document.documentElement.classList.remove("light", "dark");
//     document.documentElement.classList.add(theme);
//     console.log(document.documentElement.className, "theme")
//   }, [theme]);

//   const toggleTheme = () =>
//     setTheme((prev) => (prev === "dark" ? "light" : "dark"));

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => useContext(ThemeContext);

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const saved = localStorage.getItem("theme");

  const [theme, setTheme] = useState(saved || (systemPrefersDark ? "dark" : "light"));

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.className = theme; // sets "dark" or "light"
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === "dark" ? "light" : "dark"));

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
