import { OnboardingData } from "../../app";
import { StyleSheet, Text, View } from "react-native";
import { RouteColors } from "../../constants/theme";

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
    color: RouteColors.signal,
    fontFamily: "JetBrains Mono",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 7,
    textTransform: "uppercase",
  },
  name: {
    color: RouteColors.text,
    fontFamily: "Barlow Condensed",
    fontSize: 42,
    fontWeight: "900",
    marginTop: 16,
    textAlign: "center",
  },
  subtitle: { color: RouteColors.muted, fontFamily: "Barlow", fontSize: 16, marginTop: 12, textAlign: "center" },
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
    borderColor: RouteColors.line,
    backgroundColor: RouteColors.panel,
  },
  metricActive: { borderColor: "rgba(225,6,0,0.65)" },
  metricPosition: {
    color: RouteColors.muted,
    fontFamily: "Barlow Condensed",
    fontSize: 16,
    fontWeight: "700",
  },
  metricValue: { color: RouteColors.muted, fontFamily: "Barlow Condensed", fontSize: 26, fontWeight: "800", marginTop: 10 },
  activeText: { color: RouteColors.signal },
  metricTitle: {
    color: RouteColors.muted,
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
    borderColor: "rgba(85,201,138,0.5)",
    borderRadius: 8,
    backgroundColor: "rgba(85,201,138,0.08)",
  },
  sectionLabel: {
    color: RouteColors.muted,
    fontFamily: "JetBrains Mono",
    fontSize: 13,
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  surplusValue: { color: RouteColors.green, fontFamily: "Barlow Condensed", fontSize: 28, fontWeight: "800" },
  classLabel: { alignSelf: "flex-start", marginTop: 34, marginBottom: 14 },
  classBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "rgba(243,181,98,0.55)",
    borderRadius: 8,
  },
  classIcon: { fontSize: 22 },
  classText: { color: RouteColors.amber, fontFamily: "Barlow Condensed", fontSize: 18, fontWeight: "700" },
  footer: {
    color: RouteColors.muted,
    fontFamily: "JetBrains Mono",
    fontSize: 13,
    letterSpacing: 2,
    marginTop: 34,
  },
});
