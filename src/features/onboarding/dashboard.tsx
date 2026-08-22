import { OnboardingData } from "../../app";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  data: OnboardingData;
}

export default function Dashboard({ data }: Props) {
  const income = parseAmount(data.income);
  const spending = parseAmount(data.spendingBudget);
  const savings = parseAmount(data.savingsTarget);
  const surplus = income - spending - savings;
  const driverClass = getDriverClass(data.archetypes);

  return (
    <View style={styles.container}>
      <Text style={styles.flag}>🏁</Text>
      <Text style={styles.kicker}>Lights out.</Text>
      <Text style={styles.name}>{data.name || "Driver"}</Text>
      <Text style={styles.subtitle}>Your financial race begins. Targets locked.</Text>

      <View style={styles.metrics}>
        <Metric label="P2" title="Spending" value={formatMoney(spending)} />
        <Metric label="P1" title="Income" value={formatMoney(income)} active />
        <Metric label="P3" title="Savings" value={formatMoney(savings)} />
      </View>

      <View style={styles.surplus}>
        <Text style={styles.sectionLabel}>Monthly surplus</Text>
        <Text style={styles.surplusValue}>{formatSignedMoney(surplus)}</Text>
      </View>

      <Text style={[styles.sectionLabel, styles.classLabel]}>Driver class</Text>
      <View style={styles.classBadge}>
        <Text style={styles.classIcon}>{driverClass.icon}</Text>
        <Text style={styles.classText}>{driverClass.label}</Text>
      </View>

      <Text style={styles.footer}>Age {data.age || "--"}  ·  FIN 1 Season 2025</Text>
    </View>
  );
}

function Metric({ label, title, value, active = false }: { label: string; title: string; value: string; active?: boolean }) {
  return (
    <View style={[styles.metric, active && styles.metricActive]}>
      <Text style={[styles.metricPosition, active && styles.activeText]}>{label}</Text>
      <Text style={[styles.metricValue, active && styles.activeText]}>{value}</Text>
      <Text style={styles.metricTitle}>{title}</Text>
    </View>
  );
}

function parseAmount(value: string) {
  return Number.parseFloat(value.replace(/[^0-9.]/g, "")) || 0;
}

function formatMoney(value: number) {
  return `$${value.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

function formatSignedMoney(value: number) {
  return `${value >= 0 ? "+" : "-"}$${Math.abs(value).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

function getDriverClass(archetypes: string[]) {
  if (archetypes.includes("Funded by Parents")) return { icon: "🛡️", label: "Parent / Sponsor" };
  if (archetypes.includes("Student on Scholarship")) return { icon: "🏆", label: "Scholarship" };
  if (archetypes.includes("Student with Study Loan")) return { icon: "📋", label: "Study Loan" };
  return { icon: "⚡", label: "Working Student" };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 36,
    paddingTop: 42,
  },
  flag: { fontSize: 40, marginBottom: 18 },
  kicker: {
    color: "#E10600",
    fontFamily: "JetBrains Mono",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 7,
    textTransform: "uppercase",
  },
  name: {
    color: "#fff",
    fontFamily: "Barlow Condensed",
    fontSize: 42,
    fontWeight: "900",
    marginTop: 16,
    textAlign: "center",
  },
  subtitle: { color: "#666", fontFamily: "Barlow", fontSize: 16, marginTop: 12, textAlign: "center" },
  metrics: { width: "100%" as any, flexDirection: "row", gap: 12, marginTop: 58 },
  metric: {
    flex: 1,
    minHeight: 136,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    backgroundColor: "#161616",
  },
  metricActive: { borderColor: "rgba(225,6,0,0.65)" },
  metricPosition: {
    color: "#777",
    fontFamily: "Barlow Condensed",
    fontSize: 16,
    fontWeight: "700",
  },
  metricValue: { color: "#888", fontFamily: "Barlow Condensed", fontSize: 26, fontWeight: "800", marginTop: 10 },
  activeText: { color: "#E10600" },
  metricTitle: {
    color: "#555",
    fontFamily: "JetBrains Mono",
    fontSize: 13,
    letterSpacing: 2,
    marginTop: 7,
  },
  surplus: {
    width: "100%" as any,
    minHeight: 84,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    marginTop: 30,
    borderWidth: 1,
    borderColor: "rgba(46,204,113,0.45)",
    borderRadius: 8,
    backgroundColor: "rgba(46,204,113,0.05)",
  },
  sectionLabel: {
    color: "#666",
    fontFamily: "JetBrains Mono",
    fontSize: 13,
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  surplusValue: { color: "#2ecc71", fontFamily: "Barlow Condensed", fontSize: 28, fontWeight: "800" },
  classLabel: { alignSelf: "flex-start", marginTop: 34, marginBottom: 14 },
  classBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#70458a",
    borderRadius: 8,
  },
  classIcon: { fontSize: 22 },
  classText: { color: "#a86cc5", fontFamily: "Barlow Condensed", fontSize: 18, fontWeight: "700" },
  footer: {
    color: "#333",
    fontFamily: "JetBrains Mono",
    fontSize: 13,
    letterSpacing: 2,
    marginTop: 34,
  },
});
