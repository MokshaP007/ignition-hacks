import { useState } from "react";
import { TouchableOpacity, Text, View, StyleSheet, Platform } from "react-native";
import { RouteColors } from "../constants/theme";

interface Props {
  label: string;
  onPress: () => void;
  variant?: "primary" | "ghost";
  flex?: boolean;
  disabled?: boolean;
}

export default function RNButton({ label, onPress, variant = "primary", flex, disabled }: Props) {
  const [pressed, setPressed] = useState(false);

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      activeOpacity={0.85}
      style={[
        styles.btn,
        variant === "primary" ? styles.btnPrimary : styles.btnGhost,
        flex && styles.btnFlex,
        disabled && styles.btnDisabled,
        pressed && styles.btnPressed,
      ]}
    >
      {variant === "primary" && !disabled && (
        // Racing stripe accent
        <View style={styles.stripe} />
      )}
      <Text
        style={[
          styles.label,
          variant === "primary" ? styles.labelPrimary : styles.labelGhost,
          disabled && styles.labelDisabled,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: 52,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    overflow: "hidden",
    position: "relative",
    ...Platform.select({
      web: { cursor: "pointer", transition: "transform 0.1s, opacity 0.1s" } as any,
    }),
  },
  btnPrimary: {
    backgroundColor: RouteColors.signal,
  },
  btnGhost: {
    backgroundColor: RouteColors.panel,
    borderWidth: 1,
    borderColor: RouteColors.line,
  },
  btnFlex: {
    flex: 1,
  },
  btnDisabled: {
    opacity: 0.35,
  },
  btnPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  stripe: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: "rgba(5,11,20,0.28)",
  },
  label: {
    fontFamily: "Barlow Condensed",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  labelPrimary: {
    color: RouteColors.text,
  },
  labelGhost: {
    color: RouteColors.muted,
  },
  labelDisabled: {
    color: "#555",
  },
});
