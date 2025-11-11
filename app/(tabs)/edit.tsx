import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { loadNotes, saveNotes } from "../../lib/storage";

type Note = {
  id: number;
  text: string;
};

export default function Edit() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [text, setText] = useState("");

  useEffect(() => {
    loadNotes().then((data: Note[]) => {
      const note = data.find((n) => n.id === Number(id));
      if (note) setText(note.text);
    });
  }, [id]);

  const update = async () => {
    if (!text.trim()) return; // mencegah update kosong

    const data: Note[] = await loadNotes();
    const newNotes = data.map((n) =>
      n.id === Number(id) ? { ...n, text } : n
    );
    await saveNotes(newNotes);
    router.back();
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "#F9FAFB",
      }}
    >
      <Text
        style={{
          fontSize: 22,
          fontWeight: "600",
          marginBottom: 16,
          color: "#111827",
        }}
      >
        Edit Catatan
      </Text>

      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Edit catatan di sini..."
        placeholderTextColor="#9CA3AF"
        multiline
        style={{
          backgroundColor: "white",
          borderWidth: 1,
          borderColor: "#D1D5DB",
          borderRadius: 8,
          padding: 14,
          fontSize: 16,
          minHeight: 130,
          textAlignVertical: "top",
          color: "#111827",
        }}
      />

      <Pressable
        onPress={update}
        style={{
          backgroundColor: "#10B981",
          paddingVertical: 14,
          borderRadius: 8,
          marginTop: 20,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
          Simpan Perubahan
        </Text>
      </Pressable>
    </View>
  );
}
