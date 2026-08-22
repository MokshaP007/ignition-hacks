import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";

interface Props {
  level: number;
  xp: number;
  xpMax: number;
  streak: number;
  driverName: string;
  archetypes: string[];
  onAvatarPress: () => void;
}

const LEVEL_NAMES: Record<number, string> = {
  1: "Waterloo",
  2: "Toronto",
  3: "Vancouver",
};

const RED  = "#E10600";
const CYAN = "#00D4E8";

export default function TopHUD({ level, xp, xpMax, streak, driverName, archetypes, onAvatarPress }: Props) {
  const pct = Math.min(xp / xpMax, 1);
  const initials = driverName
    ? driverName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()
    : "FN";

  return (
    <View style={styles.hud}>
      {/* Left block */}
      <View style={styles.left}>
        {/* Level badge */}
        <View style={styles.levelBadge}>
          <View style={styles.levelMark}>
            <Text style={styles.levelNum}>{level}</Text>
          </View>
          <Text style={styles.levelName}>
            LEVEL {level}: {(LEVEL_NAMES[level] || "UNKNOWN").toUpperCase()}
          </Text>
        </View>

        {/* XP bar */}
        <View style={styles.xpRow}>
          <View style={styles.xpTrack}>
            <View style={[styles.xpFill, { width: `${pct * 100}%` as any }]} />
            {/* Cyan tip glow */}
            {pct > 0.02 && (
              <View style={[styles.xpTip, { left: `${pct * 100}%` as any }]} />
            )}
          </View>
          <Text style={styles.xpLabel}>{xp}<Text style={styles.xpSep}>/</Text>{xpMax}</Text>
        </View>
      </View>

      {/* Right block */}
      <View style={styles.right}>
        {/* Streak */}
        <View style={styles.streakPill}>
          <Text style={styles.streakFlame}>🔥</Text>
          <Text style={styles.streakCount}>{streak}</Text>
        </View>

        {/* Avatar */}
        <TouchableOpacity onPress={onAvatarPress} activeOpacity={0.8} style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
          {/* Level indicator ring */}
          <View style={styles.avatarRing} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hud: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(225,6,0,0.15)",
    ...Platform.select({
      web: {
        backgroundImage: "linear-gradient(180deg, rgba(11,11,11,0.98) 0%, rgba(11,11,11,0.92) 100%)",
        backdropFilter: "blur(12px)",
      } as any,
    }),
    backgroundColor: "#0b0b0b",
  },
  left: {
    flex: 1,
    gap: 6,
    marginRight: 12,
  },
  levelBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  levelMark: {
    width: 20,
    height: 20,
    backgroundColor: RED,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    transform: [{ skewX: "-6deg" }],
  },
  levelNum: {
    fontFamily: "Barlow Condensed",
    fontWeight: "900",
    fontSize: 13,
    color: "#fff",
    transform: [{ skewX: "6deg" }],
  },
  levelName: {
    fontFamily: "Barlow Condensed",
    fontWeight: "700",
    fontSize: 13,
    color: "#fff",
    letterSpacing: 0.8,
  },
  xpRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  xpTrack: {
    flex: 1,
    height: 5,
    backgroundColor: "#1e1e1e",
    borderRadius: 3,
    overflow: "visible",
    position: "relative",
  },
  xpFill: {
    height: "100%",
    borderRadius: 3,
    ...Platform.select({
      web: {
        backgroundImage: "linear-gradient(90deg, #E10600 0%, #00D4E8 100%)",
        transition: "width 0.5s ease-out",
        boxShadow: "0 0 8px rgba(0,212,232,0.4)",
      } as any,
    }),
    backgroundColor: RED,
  },
  xpTip: {
    position: "absolute",
    top: -3,
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: CYAN,
    marginLeft: -5,
    ...Platform.select({
      web: {
        boxShadow: "0 0 8px #00D4E8, 0 0 16px #00D4E8",
        transition: "left 0.5s ease-out",
      } as any,
    }),
  },
  xpLabel: {
    fontFamily: "JetBrains Mono",
    fontSize: 9,
    color: "rgba(255,255,255,0.4)",
    letterSpacing: 0.5,
  },
  xpSep: {
    color: "rgba(255,255,255,0.2)",
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  streakPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255,107,0,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,107,0,0.3)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  streakFlame: {
    fontSize: 11,
  },
  streakCount: {
    fontFamily: "Barlow Condensed",
    fontWeight: "700",
    fontSize: 13,
    color: "#FF6B00",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#1a1a1a",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    borderWidth: 2,
    borderColor: RED,
    ...Platform.select({
      web: {
        boxShadow: "0 0 12px rgba(225,6,0,0.4)",
      } as any,
    }),
  },
  avatarText: {
    fontFamily: "Barlow Condensed",
    fontWeight: "800",
    fontSize: 13,
    color: "#fff",
  },
  avatarRing: {
    position: "absolute",
    inset: -3,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: CYAN,
    opacity: 0.4,
  } as any,
});
