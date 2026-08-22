import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import type { Transaction } from "../screens/DashboardScreen";

interface Props {
  onClose: () => void;
  onSubmit: (transaction: Transaction) => void;
  income: number;
  budget: number;
}

const RED = "#E10600";
const CYAN = "#00D4E8";

export default function LogBottomSheet({ onClose, onSubmit, income, budget }: Props) {
  const [type, setType] = useState<Transaction["type"]>("spend");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const submit = () => {
    const parsedAmount = Number.parseFloat(amount.replace(/[^0-9.]/g, ""));
    if (!parsedAmount || parsedAmount <= 0) return;

    onSubmit({
      id: `${Date.now()}`,
      type,
      amount: parsedAmount,
      category: category.trim() || "General",
      xpEarned: type === "save" ? 12 : type === "earn" ? 10 : 8,
      timestamp: new Date(),
    });
    setAmount("");
    setCategory("");
  };

  return (
    <Modal transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <View style={styles.headingRow}>
            <View>
              <Text style={styles.kicker}>Race telemetry</Text>
              <Text style={styles.heading}>Log a money move</Text>
            </View>
            <Pressable onPress={onClose} style={styles.close}>
              <Text style={styles.closeText}>X</Text>
            </Pressable>
          </View>

          <View style={styles.typeRow}>
            {(["spend", "save", "earn"] as const).map((option) => (
              <Pressable
                key={option}
                onPress={() => setType(option)}
                style={[styles.typeButton, type === option && styles.typeButtonActive]}
              >
                <Text style={[styles.typeText, type === option && styles.typeTextActive]}>
                  {option.toUpperCase()}
                </Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.label}>Amount</Text>
          <TextInput
            value={amount}
            onChangeText={setAmount}
            placeholder="$0"
            placeholderTextColor="#666"
            keyboardType="decimal-pad"
            style={styles.input}
            autoFocus
          />
          <Text style={styles.label}>Category</Text>
          <TextInput
            value={category}
            onChangeText={setCategory}
            placeholder="Food, transit, work..."
            placeholderTextColor="#666"
            style={styles.input}
          />
          <Text style={styles.context}>Budget ${budget.toLocaleString()}  ·  Income ${income.toLocaleString()}</Text>
          <Pressable onPress={submit} style={styles.submit}>
            <Text style={styles.submitText}>ADD TO LAP  + XP</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: "flex-end" },
  backdrop: { ...StyleSheet.absoluteFill, backgroundColor: "rgba(0,0,0,0.72)" },
  sheet: {
    padding: 20,
    paddingBottom: 30,
    backgroundColor: "#151515",
    borderTopWidth: 1,
    borderTopColor: "rgba(225,6,0,0.45)",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    gap: 10,
  },
  handle: { alignSelf: "center", width: 42, height: 4, borderRadius: 2, backgroundColor: "#555", marginBottom: 4 },
  headingRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  kicker: { color: CYAN, fontFamily: "JetBrains Mono", fontSize: 10, letterSpacing: 2 },
  heading: { color: "#fff", fontFamily: "Barlow Condensed", fontSize: 26, fontWeight: "800", marginTop: 3 },
  close: { width: 30, height: 30, alignItems: "center", justifyContent: "center", backgroundColor: "#242424", borderRadius: 15 },
  closeText: { color: "#aaa", fontSize: 12 },
  typeRow: { flexDirection: "row", gap: 8, marginTop: 8 },
  typeButton: { flex: 1, paddingVertical: 10, alignItems: "center", borderWidth: 1, borderColor: "#333", borderRadius: 6 },
  typeButtonActive: { borderColor: RED, backgroundColor: "rgba(225,6,0,0.14)" },
  typeText: { color: "#777", fontFamily: "JetBrains Mono", fontSize: 10, letterSpacing: 1 },
  typeTextActive: { color: "#fff" },
  label: { color: "#999", fontFamily: "JetBrains Mono", fontSize: 10, letterSpacing: 2, marginTop: 5, textTransform: "uppercase" },
  input: { color: "#fff", backgroundColor: "#202020", borderWidth: 1, borderColor: "#333", borderRadius: 6, paddingHorizontal: 12, paddingVertical: 11, fontFamily: "Barlow", fontSize: 16 },
  context: { color: "#666", fontFamily: "JetBrains Mono", fontSize: 9, marginTop: 2 },
  submit: { alignItems: "center", backgroundColor: RED, paddingVertical: 14, borderRadius: 6, marginTop: 6 },
  submitText: { color: "#fff", fontFamily: "Barlow Condensed", fontSize: 16, fontWeight: "800", letterSpacing: 1 },
});