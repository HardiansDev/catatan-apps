import { Stack } from "expo-router";
import { createContext, useEffect, useState } from "react";
import { Switch, View } from "react-native";
import { loadTheme, saveTheme } from "../lib/storage";

export const ThemeContext = createContext<any>(null);

export default function Layout() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    loadTheme().then(setTheme);
  }, []);

  const toggle = () => {
    const t = theme === "light" ? "dark" : "light";
    setTheme(t);
    saveTheme(t);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      <View
        style={{
          paddingTop: 40,
          backgroundColor: theme === "light" ? "#fff" : "#000",
        }}
      >
        <Switch value={theme === "dark"} onValueChange={toggle} />
      </View>

      <Stack
        screenOptions={{
          headerShown: true,
          headerTitle: "Catatan",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "600",
            color: theme === "light" ? "#000" : "#fff", // <–– ini yang penting
          },
          headerStyle: {
            backgroundColor: theme === "light" ? "#fff" : "#111",
          },
          contentStyle: {
            backgroundColor: theme === "light" ? "#fff" : "#111",
          },
        }}
      />
    </ThemeContext.Provider>
  );
}
