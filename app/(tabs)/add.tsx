import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { loadNotes, saveNotes } from "../../lib/storage";

export default function Add() {
  const [text, setText] = useState("");
  const router = useRouter();

  const save = async () => {
    if (!text.trim()) return; // mencegah simpan kosong

    const data = await loadNotes();
    data.push({ id: Date.now(), text });
    await saveNotes(data);
    router.back();
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "#F9FAFB",
        justifyContent: "flex-start",
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
        Tambah Catatan
      </Text>

      <TextInput
        placeholder="Tulis catatan di sini..."
        placeholderTextColor="#9CA3AF"
        value={text}
        onChangeText={setText}
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
        onPress={save}
        style={{
          backgroundColor: "#2563EB",
          paddingVertical: 14,
          borderRadius: 8,
          marginTop: 20,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
          Simpan
        </Text>
      </Pressable>
    </View>
  );
}
