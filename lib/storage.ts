import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveNotes = async (notes: any[]) => {
  await AsyncStorage.setItem("notes", JSON.stringify(notes));
};

export const loadNotes = async () => {
  const data = await AsyncStorage.getItem("notes");
  return data ? JSON.parse(data) : [];
};

export const saveTheme = async (theme: string) => {
  await AsyncStorage.setItem("theme", theme);
};

export const loadTheme = async () => {
  const theme = await AsyncStorage.getItem("theme");
  return theme || "light";
};
