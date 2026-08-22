import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import type { OnboardingData } from "../app";
import type { Transaction } from "../screens/DashboardScreen";

interface Props {
  data: OnboardingData;
  transactions: Transaction[];
  xp: number;
  streak: number;
  onClose: () => void;
}

const ARCHETYPE_META: Record<string, { icon: string; color: string }> = {
  working:     { icon: "⚡", color: "#FF8C00" },
  loan:        { icon: "📋", color: "#00B4D8" },
  scholarship: { icon: "🏆", color: "#E10600" },
  sponsored:   { icon: "🛡️", color: "#9B59B6" },
};

const RED  = "#E10600";
const CYAN = "#00D4E8";

export default function ProfileDropdown({ data, transactions, xp, streak, onClose }: Props) {
  const totalSpend = transactions.filter(t => t.type === "spend").reduce((s, t) => s + t.amount, 0);
  const totalSave  = transactions.filter(t => t.type === "save").reduce((s, t) => s + t.amount, 0);
  const totalEarn  = transactions.filter(t => t.type === "earn").reduce((s, t) => s + t.amount, 0);
  const initials   = data.name
    ? data.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()
    : "FN";

  return (
    <>
      {/* Backdrop tap-to-close */}
      <TouchableOpacity style={styles.backdrop} onPress={onClose} activeOpacity={1} />

      {/* Card */}
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <View style={styles.nameCol}>
            <Text style={styles.driverName}>{data.name || "Driver"}</Text>
            <Text style={styles.driverAge}>Age {data.age}  ·  {transactions.length} logs</Text>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeX}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Driver class chips */}
        {data.archetypes.length > 0 && (
          <View style={styles.chipsRow}>
            {data.archetypes.map(id => {
              const m = ARCHETYPE_META[id];
              return (
                <View key={id} style={[styles.chip, { borderColor: m.color + "55" }]}>
                  <Text style={styles.chipIcon}>{m.icon}</Text>
                  <View style={[styles.chipDot, { backgroundColor: m.color }]} />
                </View>
              );
            })}
          </View>
        )}

        {/* Divider */}
        <View style={styles.divider} />

        {/* Stats grid */}
        <View style={styles.statsGrid}>
          <StatCell label="Total XP" value={`${xp} pts`}   color={CYAN} />
          <StatCell label="Streak"   value={`${streak} 🔥`} color="#FF6B00" />
          <StatCell label="Earned"   value={`$${totalEarn.toLocaleString()}`} color={CYAN}  />
          <StatCell label="Spent"    value={`$${totalSpend.toLocaleString()}`} color={RED}   />
          <StatCell label="Saved"    value={`$${totalSave.toLocaleString()}`}  color="#2ECC71" />
          <StatCell label="Budget"   value={`$${Number(data.spendingBudget).toLocaleString()}/mo`} color="rgba(255,255,255,0.4)" />
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Settings row */}
        <View style={styles.settingsRow}>
          <TouchableOpacity style={styles.settingsBtn}>
            <Text style={styles.settingsBtnText}>⚙  Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsBtn}>
            <Text style={styles.settingsBtnText}>📊  Full Stats</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

function StatCell({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <View style={styles.statCell}>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 90,
  } as any,
  card: {
    position: "absolute",
    top: 66,
    right: 14,
    left: 14,
    zIndex: 100,
    borderRadius: 14,
    padding: 16,
    ...Platform.select({
      web: {
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: "0 16px 48px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)",
      } as any,
    }),
    backgroundColor: "rgba(16,16,16,0.95)",
    borderWidth: 1,
    borderColor: "rgba(225,6,0,0.2)",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#1a1a1a",
    borderWidth: 2,
    borderColor: "#E10600",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontFamily: "Barlow Condensed",
    fontWeight: "800",
    fontSize: 16,
    color: "#fff",
  },
  nameCol: {
    flex: 1,
    gap: 2,
  },
  driverName: {
    fontFamily: "Barlow Condensed",
    fontWeight: "800",
    fontSize: 18,
    color: "#fff",
    letterSpacing: 0.3,
  },
  driverAge: {
    fontFamily: "JetBrains Mono",
    fontSize: 9,
    color: "rgba(255,255,255,0.35)",
    letterSpacing: 1,
  },
  closeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#222",
    alignItems: "center",
    justifyContent: "center",
  },
  closeX: {
    fontSize: 11,
    color: "rgba(255,255,255,0.5)",
  },
  chipsRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  chipIcon: {
    fontSize: 13,
  },
  chipDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.06)",
    marginVertical: 12,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 1,
  },
  statCell: {
    width: "33.33%" as any,
    paddingVertical: 6,
    paddingHorizontal: 4,
    gap: 2,
  },
  statValue: {
    fontFamily: "Barlow Condensed",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: -0.3,
  },
  statLabel: {
    fontFamily: "JetBrains Mono",
    fontSize: 8,
    color: "rgba(255,255,255,0.3)",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  settingsRow: {
    flexDirection: "row",
    gap: 8,
  },
  settingsBtn: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: "center",
  },
  settingsBtnText: {
    fontFamily: "Barlow Condensed",
    fontWeight: "600",
    fontSize: 13,
    color: "rgba(255,255,255,0.5)",
    letterSpacing: 0.5,
  },
});
