import { StyleSheet, Text, View } from "react-native";
import { OnboardingData } from "../../app";
import RNButton from "../../components/RNButton";
import RNCard from "../../components/RNCard";
import RNField from "../../components/RNField";

interface Props {
  data: OnboardingData;
  update: (patch: Partial<OnboardingData>) => void;
  onNext: () => void;
}

export default function Step1Identity({ data, update, onNext }: Props) {
  const driverName = data.name.trim();
  const canContinue = driverName.length > 0 && data.age.trim().length > 0;

  return (
    <RNCard
      headline="Welcome to Your Financial Quest"
      subtext="Let's set up your driver profile to track your student journey."
      actions={<RNButton label="Next  ->" onPress={onNext} disabled={!canContinue} flex />}
    >
      <RNField
        label="Driver name"
        value={data.name}
        onChangeText={(name) => update({ name })}
        placeholder="Your name"
        autoFocus
      />
      <RNField
        label="Age"
        value={data.age}
        onChangeText={(age) => update({ age })}
        placeholder="Your age"
        keyboardType="numeric"
      />
      {driverName.length > 0 && (
        <View style={styles.clearance}>
          <Text style={styles.diamond}>◆</Text>
          <Text style={styles.clearanceText}>
            Driver <Text style={styles.driverName}>{driverName}</Text> is cleared for the grid.
          </Text>
        </View>
      )}
    </RNCard>
  );
}

const styles = StyleSheet.create({
  clearance: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderLeftWidth: 3,
    borderLeftColor: "#E10600",
    backgroundColor: "rgba(225,6,0,0.08)",
  },
  diamond: {
    color: "#E10600",
    fontSize: 14,
    lineHeight: 20,
  },
  clearanceText: {
    flex: 1,
    color: "#888",
    fontFamily: "Barlow",
    fontSize: 16,
    fontStyle: "italic",
    lineHeight: 22,
  },
  driverName: {
    color: "#E10600",
    fontStyle: "normal",
    fontWeight: "600",
  },
});
