import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";

interface Props {
  onSteerLeft: () => void;
  onSteerRight: () => void;
  onFABPress: () => void;
  level: number;
  xp: number;
  xpMax: number;
}

const RED  = "#E10600";
const CYAN = "#00D4E8";

export default function BottomBar({ onSteerLeft, onSteerRight, onFABPress, level, xp, xpMax }: Props) {
  const [leftActive,  setLeftActive]  = useState(false);
  const [rightActive, setRightActive] = useState(false);

  return (
    <View style={styles.bar}>
      {/* Glass background */}
      <View style={styles.glass} />

      {/* Left steer */}
      <TouchableOpacity
        style={[styles.steer, styles.steerLeft, leftActive && styles.steerActive]}
        onPress={onSteerLeft}
        onPressIn={() => setLeftActive(true)}
        onPressOut={() => setLeftActive(false)}
        activeOpacity={1}
      >
        <View style={styles.steerInner}>
          <Text style={styles.steerArrow}>◀◀</Text>
          <Text style={styles.steerLabel}>STEER</Text>
        </View>
        {leftActive && <View style={[styles.steerGlow, { backgroundColor: RED }]} />}
      </TouchableOpacity>

      {/* Center cluster: minimap dot + FAB */}
      <View style={styles.center}>
        {/* XP mini indicator */}
        <View style={styles.xpMini}>
          <View style={styles.xpMiniTrack}>
            <View style={[styles.xpMiniFill, { width: `${(xp / xpMax) * 100}%` as any }]} />
          </View>
          <Text style={styles.xpMiniText}>{xp} XP</Text>
        </View>

        {/* FAB */}
        <TouchableOpacity style={styles.fab} onPress={onFABPress} activeOpacity={0.8}>
          <View style={styles.fabRing} />
          <View style={styles.fabRing2} />
          <Text style={styles.fabIcon}>+</Text>
          <Text style={styles.fabLabel}>LOG</Text>
        </TouchableOpacity>

        {/* Level indicator */}
        <Text style={styles.levelLabel}>LVL {level}</Text>
      </View>

      {/* Right steer */}
      <TouchableOpacity
        style={[styles.steer, styles.steerRight, rightActive && styles.steerActive]}
        onPress={onSteerRight}
        onPressIn={() => setRightActive(true)}
        onPressOut={() => setRightActive(false)}
        activeOpacity={1}
      >
        <View style={styles.steerInner}>
          <Text style={styles.steerArrow}>▶▶</Text>
          <Text style={styles.steerLabel}>STEER</Text>
        </View>
        {rightActive && <View style={[styles.steerGlow, { backgroundColor: RED }]} />}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 112,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingBottom: 8,
    position: "relative",
    overflow: "hidden",
  },
  glass: {
    position: "absolute",
    inset: 0,
    ...Platform.select({
      web: {
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      } as any,
    }),
    backgroundColor: "rgba(11,11,11,0.9)",
    borderTopWidth: 1,
    borderTopColor: "rgba(225,6,0,0.15)",
  } as any,
  steer: {
    flex: 1,
    height: 72,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    ...Platform.select({
      web: { cursor: "pointer" } as any,
    }),
  },
  steerLeft: {
    borderRightWidth: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  steerRight: {
    borderLeftWidth: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  steerActive: {
    backgroundColor: "rgba(225,6,0,0.1)",
    borderColor: "rgba(225,6,0,0.4)",
  },
  steerInner: {
    alignItems: "center",
    gap: 2,
  },
  steerArrow: {
    fontSize: 18,
    color: "rgba(255,255,255,0.25)",
  },
  steerLabel: {
    fontFamily: "JetBrains Mono",
    fontSize: 7,
    color: "rgba(255,255,255,0.2)",
    letterSpacing: 2,
  },
  steerGlow: {
    position: "absolute",
    inset: 0,
    opacity: 0.08,
  } as any,
  center: {
    width: 100,
    alignItems: "center",
    gap: 4,
    zIndex: 1,
  },
  xpMini: {
    width: 80,
    alignItems: "center",
    gap: 2,
  },
  xpMiniTrack: {
    width: 80,
    height: 3,
    backgroundColor: "#1e1e1e",
    borderRadius: 2,
    overflow: "hidden",
  },
  xpMiniFill: {
    height: "100%",
    ...Platform.select({
      web: {
        backgroundImage: "linear-gradient(90deg, #E10600, #00D4E8)",
        transition: "width 0.5s",
      } as any,
    }),
    backgroundColor: "#E10600",
  },
  xpMiniText: {
    fontFamily: "JetBrains Mono",
    fontSize: 8,
    color: "rgba(255,255,255,0.25)",
    letterSpacing: 1,
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E10600",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    ...Platform.select({
      web: {
        boxShadow: "0 0 24px rgba(225,6,0,0.5), 0 0 48px rgba(225,6,0,0.2)",
        cursor: "pointer",
      } as any,
    }),
  },
  fabRing: {
    position: "absolute",
    inset: -5,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: "rgba(225,6,0,0.3)",
  },
  fabRing2: {
    position: "absolute",
    inset: -10,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "rgba(225,6,0,0.12)",
  },
  fabIcon: {
    fontSize: 28,
    color: "#fff",
    lineHeight: 30,
    fontWeight: "300",
  },
  fabLabel: {
    position: "absolute",
    bottom: 7,
    fontFamily: "JetBrains Mono",
    fontSize: 5,
    color: "rgba(255,255,255,0.7)",
    letterSpacing: 2,
  },
  levelLabel: {
    fontFamily: "JetBrains Mono",
    fontSize: 8,
    color: "rgba(255,255,255,0.2)",
    letterSpacing: 1,
  },
});
