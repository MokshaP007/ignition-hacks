import { useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import Step1Identity from "../features/onboarding/Step1Identity";
import Step2Archetype from "../features/onboarding/Step2Archetype";
import Step3Income from "../features/onboarding/Step3Income";
import Step4Targets from "../features/onboarding/Step4Targets";
import Dashboard from "../features/onboarding/dashboard";
import AppShell from "../components/AppShell";

export type OnboardingData = {
  name: string;
  age: string;
  archetypes: string[];
  income: string;
  spendingBudget: string;
  savingsTarget: string;
};

const TOTAL_STEPS = 4;

export default function Index() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    name: "",
    age: "",
    archetypes: [],
    income: "",
    spendingBudget: "",
    savingsTarget: "",
  });

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS + 1));
  const back = () => setStep((s) => Math.max(s - 1, 1));
  const update = (patch: Partial<OnboardingData>) =>
    setData((d) => ({ ...d, ...patch }));

  return (
    <View style={styles.webHost}>
      <View style={styles.phone}>
        {/* Status bar area */}
        <View style={styles.statusBar} />

        <AppShell step={step} total={TOTAL_STEPS} done={step > TOTAL_STEPS}>
          {step === 1 && <Step1Identity data={data} update={update} onNext={next} />}
          {step === 2 && <Step2Archetype data={data} update={update} onNext={next} onBack={back} />}
          {step === 3 && <Step3Income data={data} update={update} onNext={next} onBack={back} />}
          {step === 4 && <Step4Targets data={data} update={update} onComplete={next} onBack={back} />}
          {step > TOTAL_STEPS && <Dashboard data={data} />}
        </AppShell>

        {/* Home indicator */}
        <View style={styles.homeBar}>
          <View style={styles.homeIndicator} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  webHost: {
    flex: 1,
    minHeight: "100vh" as any,
    width: "100%" as any,
    backgroundColor: "#050505",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    boxSizing: "border-box" as any,
  },
  phone: {
    width: "100%" as any,
    maxWidth: 390,
    height: 844,
    maxHeight: "calc(100vh - 48px)" as any,
    backgroundColor: "#0b0b0b",
    borderRadius: 44,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(225,6,0,0.15)",
    ...Platform.select({
      web: {
        boxShadow: "0 40px 120px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.04), 0 0 60px rgba(225,6,0,0.06)",
      } as any,
    }),
  },
  statusBar: {
    height: 50,
    backgroundColor: "#0b0b0b",
  },
  homeBar: {
    height: 34,
    backgroundColor: "#0b0b0b",
    alignItems: "center",
    justifyContent: "center",
  },
  homeIndicator: {
    width: 134,
    height: 5,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
});