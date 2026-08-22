import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Platform } from "react-native";
import { RouteColors } from "../constants/theme";

interface Props {
  label: string;
  hint?: string;
  prefix?: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder: string;
  keyboardType?: "default" | "numeric" | "decimal-pad";
  autoFocus?: boolean;
}

export default function RNField({
  label,
  hint,
  prefix,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  autoFocus,
}: Props) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.group}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputRow,
          focused && styles.inputRowFocused,
        ]}
      >
        {prefix && (
          <View style={styles.prefixBox}>
            <Text style={styles.prefixText}>{prefix}</Text>
          </View>
        )}
        <TextInput
          style={[styles.input, prefix && styles.inputWithPrefix]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#444"
          keyboardType={keyboardType}
          autoFocus={autoFocus}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </View>
      {hint && <Text style={styles.hint}>{hint}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    gap: 6,
  },
  label: {
    fontFamily: "Barlow Condensed",
    fontWeight: "600",
    fontSize: 13,
    color: RouteColors.muted,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: RouteColors.panel,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: RouteColors.line,
    overflow: "hidden",
    ...Platform.select({
      web: { transition: "border-color 0.15s" } as any,
    }),
  },
  inputRowFocused: {
    borderColor: RouteColors.signal,
    ...Platform.select({
      web: { boxShadow: "0 0 0 2px rgba(113,155,145,0.18)" } as any,
    }),
  },
  prefixBox: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRightWidth: 1,
    borderRightColor: RouteColors.line,
  },
  prefixText: {
    fontFamily: "JetBrains Mono",
    fontSize: 15,
    color: RouteColors.muted,
  },
  input: {
    flex: 1,
    fontFamily: "Barlow",
    fontSize: 16,
    fontWeight: "500",
    color: RouteColors.text,
    paddingHorizontal: 14,
    paddingVertical: 14,
    outlineStyle: "none",
  } as any,
  inputWithPrefix: {
    paddingLeft: 12,
  },
  hint: {
    fontFamily: "Barlow",
    fontSize: 12,
    color: RouteColors.muted,
    lineHeight: 16,
  },
});
