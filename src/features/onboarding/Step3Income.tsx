import { OnboardingData } from "../../app";
import { StyleSheet, Text, View } from "react-native";
import RNButton from "../../components/RNButton";
import RNCard from "../../components/RNCard";
import RNField from "../../components/RNField";

interface Props {
  data: OnboardingData;
  update: (patch: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step3Income({ data, update, onNext, onBack }: Props) {
  const income = Number.parseFloat(data.income.replace(/[^0-9.]/g, "")) || 0;
  const canContinue = income > 0;
  const formatMoney = (amount: number) =>
    amount.toLocaleString("en-US", { style: "currency", currency: "USD" });

  return (
    <RNCard
      badge="Fuel gauge"
      headline="Your Monthly Inflow"
      subtext="How much money do you receive monthly from jobs, parents, or sponsors?"
      actions={
        <>
          <RNButton label="<- Back" onPress={onBack} variant="ghost" flex />
          <RNButton label="Next  ->" onPress={onNext} disabled={!canContinue} flex />
        </>
      }
    >
      <RNField
        label="Income / Support"
        value={data.income}
        onChangeText={(income) => update({ income })}
        placeholder="0"
        prefix="$"
        keyboardType="decimal-pad"
        autoFocus
      />
      <Text style={styles.hint}>Include your regular monthly allowance or earnings.</Text>
      {canContinue && (
        <View style={styles.summary}>
          <View style={styles.monthlyRow}>
            <Text style={styles.summaryLabel}>Monthly fuel</Text>
            <Text style={styles.monthlyValue}>{formatMoney(income)}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <View style={styles.detail}>
              <Text style={styles.summaryLabel}>Per day</Text>
              <Text style={styles.detailValue}>{formatMoney(income / 30)}</Text>
            </View>
            <View style={styles.verticalDivider} />
            <View style={styles.detail}>
              <Text style={styles.summaryLabel}>Annually</Text>
              <Text style={styles.detailValue}>{formatMoney(income * 12)}</Text>
            </View>
          </View>
        </View>
      )}
    </RNCard>
  );
}

const styles = StyleSheet.create({
  hint: {
    color: "#555",
    fontFamily: "Barlow",
    fontSize: 12,
    lineHeight: 16,
    marginTop: -10,
  },
  summary: {
    borderWidth: 1,
    borderColor: "rgba(225,6,0,0.5)",
    borderRadius: 8,
    backgroundColor: "#161616",
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 14,
  },
  monthlyRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  summaryLabel: {
    color: "#666",
    fontFamily: "JetBrains Mono",
    fontSize: 12,
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  monthlyValue: {
    color: "#E10600",
    fontFamily: "Barlow Condensed",
    fontSize: 25,
    fontWeight: "800",
  },
  divider: { height: 1, backgroundColor: "#292929" },
  detailRow: { flexDirection: "row", alignItems: "stretch" },
  detail: { flex: 1, gap: 6 },
  verticalDivider: { width: 1, backgroundColor: "#292929", marginHorizontal: 20 },
  detailValue: {
    color: "#ddd",
    fontFamily: "Barlow Condensed",
    fontSize: 18,
    fontWeight: "700",
  },
});
