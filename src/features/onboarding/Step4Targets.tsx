import { StyleSheet, Text, View } from "react-native";
import { OnboardingData } from "../../app";
import RNButton from "../../components/RNButton";
import RNCard from "../../components/RNCard";
import RNField from "../../components/RNField";
import { RouteColors } from "../../constants/theme";

interface Props {
  data: OnboardingData;
  update: (patch: Partial<OnboardingData>) => void;
  onComplete: () => void;
  onBack: () => void;
}

export default function Step4Targets({ data, update, onComplete, onBack }: Props) {
  const income = Number.parseFloat(data.income.replace(/[^0-9.]/g, "")) || 0;
  const spending = Number.parseFloat(data.spendingBudget.replace(/[^0-9.]/g, "")) || 0;
  const savings = Number.parseFloat(data.savingsTarget.replace(/[^0-9.]/g, "")) || 0;
  const totalAllocated = spending + savings;
  const surplus = income - totalAllocated;
  const canComplete = spending > 0;
  const formatMoney = (amount: number) =>
    `${amount < 0 ? "-" : ""}$${Math.abs(amount).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;

  return (
    <RNCard
      badge="Race strategy"
      headline="Set Your Financial Baseline"
      subtext="Define your goals so we can track your progression quests."
      actions={
        <>
          <RNButton label="<- Back" onPress={onBack} variant="ghost" flex />
          <RNButton label="Complete  ✦" onPress={onComplete} disabled={!canComplete} flex />
        </>
      }
    >
      <RNField
        label="Monthly spending budget"
        value={data.spendingBudget}
        onChangeText={(spendingBudget) => update({ spendingBudget })}
        placeholder="0"
        prefix="$"
        keyboardType="decimal-pad"
        autoFocus
      />
      <RNField
        label="Monthly savings target (optional)"
        value={data.savingsTarget}
        onChangeText={(savingsTarget) => update({ savingsTarget })}
        placeholder="0"
        prefix="$"
        keyboardType="decimal-pad"
      />
      {canComplete && (
        <View style={styles.breakdown}>
          <Text style={styles.breakdownTitle}>Pace breakdown</Text>
          <View style={styles.bar}>
            <View
              style={[styles.spendingBar, { width: `${totalAllocated ? (spending / totalAllocated) * 100 : 0}%` as any }]}
            />
            <View
              style={[styles.savingsBar, { width: `${totalAllocated ? (savings / totalAllocated) * 100 : 0}%` as any }]}
            />
          </View>
          <View style={styles.legend}>
            <BreakdownItem label="Spending" value={formatMoney(spending)} color={RouteColors.signal} />
            <BreakdownItem label="Savings" value={formatMoney(savings)} color={RouteColors.cyan} />
            <BreakdownItem label="Surplus" value={`+${formatMoney(surplus)}`} color={RouteColors.green} />
          </View>
        </View>
      )}
    </RNCard>
  );
}

function BreakdownItem({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <View style={styles.breakdownItem}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={styles.breakdownLabel}>{label}</Text>
      <Text style={[styles.breakdownValue, { color }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  breakdown: {
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: RouteColors.line,
    borderRadius: 8,
    backgroundColor: RouteColors.panel,
    gap: 14,
  },
  breakdownTitle: {
    color: RouteColors.muted,
    fontFamily: "JetBrains Mono",
    fontSize: 12,
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  bar: { height: 8, flexDirection: "row", overflow: "hidden", borderRadius: 4, backgroundColor: RouteColors.line },
  spendingBar: { height: "100%" as any, backgroundColor: RouteColors.signal },
  savingsBar: { height: "100%" as any, backgroundColor: RouteColors.cyan },
  legend: { flexDirection: "row", justifyContent: "space-between" },
  breakdownItem: { alignItems: "center", gap: 5, minWidth: 72 },
  dot: { width: 7, height: 7, borderRadius: 4 },
  breakdownLabel: { color: RouteColors.muted, fontFamily: "JetBrains Mono", fontSize: 11, letterSpacing: 1 },
  breakdownValue: { fontFamily: "Barlow Condensed", fontSize: 17, fontWeight: "700" },
});
