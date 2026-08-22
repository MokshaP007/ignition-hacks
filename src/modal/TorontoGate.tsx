import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";

interface Props {
  driverName: string;
  onContinue: () => void;
}

const RED  = "#E10600";
const CYAN = "#00D4E8";
const GOLD = "#C8A84B";

export default function TorontoGate({ driverName, onContinue }: Props) {
  const [dismissed, setDismissed] = useState(false);

  const handleContinue = () => {
    setDismissed(true);
    setTimeout(onContinue, 300);
  };

  return (
    <View style={[styles.overlay, dismissed && { opacity: 0 } as any]}>
      {/* Background grid */}
      <View style={styles.grid} />

      {/* Content */}
      <View style={styles.content}>
        {/* Checkered flag */}
        <Text style={styles.flag}>🏁</Text>

        {/* SECTOR COMPLETE */}
        <Text style={styles.sectorTag}>SECTOR COMPLETE</Text>
        <Text style={styles.cityName}>WATERLOO</Text>

        {/* Stats */}
        <View style={styles.statsRow}>
          <CompleteStat label="DISTANCE" value="42.0 km" />
          <CompleteStat label="XP EARNED" value="200 pts" highlight />
          <CompleteStat label="LAPS" value="4 / 4" />
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* NEXT CITY */}
        <View style={styles.unlockCard}>
          {/* CN Tower silhouette */}
          <View style={styles.torontoSkyline}>
            {/* Simplified CN Tower */}
            <View style={styles.cnTower}>
              <View style={styles.cnPod} />
              <View style={styles.cnNeedle} />
              <View style={styles.cnBase} />
            </View>
            {/* Buildings */}
            {[30, 22, 38, 18, 26, 34, 20, 28].map((h, i) => (
              <View key={i} style={[styles.building, { height: h, width: 8 + (i % 3) * 3 }]} />
            ))}
          </View>

          <View style={styles.cityLockRow}>
            <View style={[styles.cyTag, { borderColor: CYAN }]}>
              <Text style={[styles.cyTagText, { color: CYAN }]}>NEXT</Text>
            </View>
            <Text style={styles.torontoLabel}>TORONTO, ONTARIO</Text>
          </View>
          <Text style={styles.torontoSub}>CN Tower · Financial District · Distillery District</Text>
        </View>

        {/* Driver message */}
        <Text style={styles.message}>
          Outstanding pace, <Text style={{ color: RED }}>{driverName || "Driver"}</Text>.
          {"\n"}The highway to Toronto is open.
        </Text>

        {/* CTA */}
        <TouchableOpacity style={styles.ctaBtn} onPress={handleContinue} activeOpacity={0.85}>
          <View style={styles.ctaStripe} />
          <Text style={styles.ctaText}>ENTER TORONTO  →</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleContinue} style={styles.skipBtn}>
          <Text style={styles.skipText}>Stay in Waterloo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function CompleteStat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <View style={styles.cStat}>
      <Text style={[styles.cStatVal, highlight && { color: GOLD }]}>{value}</Text>
      <Text style={styles.cStatLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    inset: 0,
    zIndex: 200,
    backgroundColor: "rgba(0,0,0,0.96)",
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      web: { transition: "opacity 0.3s" } as any,
    }),
  } as any,
  grid: {
    position: "absolute",
    inset: 0,
    ...Platform.select({
      web: {
        backgroundImage:
          "linear-gradient(rgba(225,6,0,0.05) 1px, transparent 1px), " +
          "linear-gradient(90deg, rgba(225,6,0,0.05) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      } as any,
    }),
  } as any,
  content: {
    width: "100%" as any,
    paddingHorizontal: 24,
    alignItems: "center",
    gap: 14,
  },
  flag: {
    fontSize: 44,
  },
  sectorTag: {
    fontFamily: "JetBrains Mono",
    fontSize: 9,
    color: CYAN,
    letterSpacing: 4,
  },
  cityName: {
    fontFamily: "Barlow Condensed",
    fontWeight: "900",
    fontSize: 48,
    color: "#fff",
    letterSpacing: -1,
    marginTop: -6,
    ...Platform.select({
      web: {
        textShadow: `0 0 40px ${RED}`,
      } as any,
    }),
  },
  statsRow: {
    flexDirection: "row",
    gap: 0,
    width: "100%" as any,
  },
  cStat: {
    flex: 1,
    alignItems: "center",
    gap: 2,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  cStatVal: {
    fontFamily: "Barlow Condensed",
    fontWeight: "800",
    fontSize: 18,
    color: "#fff",
  },
  cStatLabel: {
    fontFamily: "JetBrains Mono",
    fontSize: 7,
    color: "rgba(255,255,255,0.3)",
    letterSpacing: 1.5,
  },
  divider: {
    width: "100%" as any,
    height: 1,
    backgroundColor: `${RED}33`,
  },
  unlockCard: {
    width: "100%" as any,
    backgroundColor: "rgba(0,212,232,0.04)",
    borderWidth: 1,
    borderColor: `${CYAN}40`,
    borderRadius: 12,
    padding: 16,
    gap: 8,
    alignItems: "center",
    overflow: "hidden",
  },
  torontoSkyline: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 50,
    gap: 2,
    marginBottom: 8,
    opacity: 0.3,
  },
  cnTower: {
    alignItems: "center",
    justifyContent: "flex-end",
    height: 50,
    width: 16,
    marginRight: 4,
  },
  cnNeedle: {
    width: 2,
    height: 28,
    backgroundColor: CYAN,
  },
  cnPod: {
    width: 8,
    height: 5,
    backgroundColor: CYAN,
    borderRadius: 1,
    position: "absolute",
    bottom: 20,
  },
  cnBase: {
    width: 10,
    height: 18,
    backgroundColor: CYAN,
    borderRadius: 1,
  },
  building: {
    backgroundColor: CYAN,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
  },
  cityLockRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cyTag: {
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  cyTagText: {
    fontFamily: "JetBrains Mono",
    fontSize: 8,
    letterSpacing: 2,
  },
  torontoLabel: {
    fontFamily: "Barlow Condensed",
    fontWeight: "800",
    fontSize: 20,
    color: "#fff",
    letterSpacing: 0.5,
  },
  torontoSub: {
    fontFamily: "JetBrains Mono",
    fontSize: 8.5,
    color: "rgba(255,255,255,0.3)",
    letterSpacing: 0.5,
    textAlign: "center",
  },
  message: {
    fontFamily: "Barlow",
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    textAlign: "center",
    lineHeight: 20,
    fontStyle: "italic",
  },
  ctaBtn: {
    width: "100%" as any,
    height: 52,
    borderRadius: 10,
    backgroundColor: RED,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    ...Platform.select({
      web: {
        boxShadow: `0 0 24px ${RED}80`,
        cursor: "pointer",
      } as any,
    }),
  },
  ctaStripe: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 5,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  ctaText: {
    fontFamily: "Barlow Condensed",
    fontWeight: "800",
    fontSize: 16,
    color: "#fff",
    letterSpacing: 2.5,
  },
  skipBtn: {
    paddingVertical: 6,
  },
  skipText: {
    fontFamily: "Barlow",
    fontSize: 12,
    color: "rgba(255,255,255,0.2)",
  },
});
