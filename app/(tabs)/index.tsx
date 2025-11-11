import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useContext, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { loadNotes, saveNotes } from "../../lib/storage";
import { ThemeContext } from "../_layout";

export default function NotesList() {
  const router = useRouter();
  const [notes, setNotes] = useState<any[]>([]);
  const { theme } = useContext(ThemeContext);

  // Load ulang setiap halaman dibuka
  useFocusEffect(
    useCallback(() => {
      loadNotes().then(setNotes);
    }, [])
  );

  const remove = (id: number) => {
    const newNotes = notes.filter((n) => n.id !== id);
    setNotes(newNotes);
    saveNotes(newNotes);
  };

  return (
    <View style={{ padding: 20, flex: 1 }}>
      <Pressable
        onPress={() => router.push("/add")}
        style={{
          backgroundColor: theme === "light" ? "#007bff" : "#ffdd33",
          padding: 12,
          borderRadius: 10,
          marginBottom: 15,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: theme === "light" ? "#fff" : "#000",
            fontWeight: "bold",
          }}
        >
          + Tambah Catatan
        </Text>
      </Pressable>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 15,
              marginTop: 10,
              backgroundColor: theme === "light" ? "#f5f5f5" : "#222",
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                color: theme === "light" ? "#000" : "#fff",
                fontSize: 16,
              }}
            >
              {item.text}
            </Text>

            <View style={{ flexDirection: "row", marginTop: 10, gap: 20 }}>
              <Pressable onPress={() => router.push(`/edit?id=${item.id}`)}>
                <Text style={{ color: "green", fontWeight: "bold" }}>Edit</Text>
              </Pressable>

              <Pressable onPress={() => remove(item.id)}>
                <Text style={{ color: "red", fontWeight: "bold" }}>Hapus</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
}
