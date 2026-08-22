import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { OnboardingData } from "../../app";
import RNButton from "../../components/RNButton";
import RNCard from "../../components/RNCard";
import { RouteColors } from "../../constants/theme";

interface Props {
  data: OnboardingData;
  update: (patch: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const FUNDING_OPTIONS = [
  { title: "Working Student", description: "Has a job or side hustle", icon: "⚡" },
  { title: "Student with Study Loan", description: "Funded through student loans", icon: "📋" },
  { title: "Student on Scholarship", description: "Academic / merit-based", icon: "🏆" },
  { title: "Funded by Parents", description: "Living expenses covered by family", icon: "🛡️" },
];
export default function Step2Archetype({ data, update, onNext, onBack }: Props) {
  const [selected, setSelected] = useState(data.archetypes);

  const toggle = (funding: string) => {
    const next = selected.includes(funding)
      ? selected.filter((item) => item !== funding)
      : [...selected, funding];
    setSelected(next);
    update({ archetypes: next });
  };

  return (
    <RNCard
      badge="Driver class"
      headline="What describes your student funding?"
      subtext="Select all that apply - many students balance multiple sources."
      actions={
        <>
          <RNButton label="<- Back" onPress={onBack} variant="ghost" flex />
          <RNButton label="Next  ->" onPress={onNext} disabled={selected.length === 0} flex />
        </>
      }
    >
      <View style={styles.options}>
        {FUNDING_OPTIONS.map((option) => {
          const active = selected.includes(option.title);
          return (
            <Pressable
              key={option.title}
              onPress={() => toggle(option.title)}
              style={[styles.option, active && styles.optionActive]}
            >
              <View style={[styles.checkbox, active && styles.checkboxActive]}>
                {active && <Text style={styles.check}>✓</Text>}
              </View>
              <Text style={styles.icon}>{option.icon}</Text>
              <View style={styles.optionCopy}>
                <Text style={[styles.optionText, active && styles.optionTextActive]}>{option.title}</Text>
                <Text style={styles.description}>{option.description}</Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </RNCard>
  );
}

const styles = StyleSheet.create({
  options: { gap: 10 },
  option: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: RouteColors.line,
    backgroundColor: RouteColors.panel,
  },
  optionActive: { borderColor: RouteColors.cyan, backgroundColor: "rgba(113,155,145,0.1)" },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: RouteColors.muted,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxActive: { borderColor: RouteColors.cyan, backgroundColor: RouteColors.cyan },
  check: { color: RouteColors.ink, fontSize: 13, fontWeight: "700" },
  icon: { width: 34, fontSize: 24, textAlign: "center" },
  optionCopy: { flex: 1, gap: 3 },
  optionText: { color: "#aaa", fontFamily: "Barlow Condensed", fontSize: 18, fontWeight: "700" },
  optionTextActive: { color: RouteColors.text, fontWeight: "600" },
  description: { color: RouteColors.muted, fontFamily: "Barlow", fontSize: 14 },
});
