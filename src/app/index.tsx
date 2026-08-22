import { useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import Step1Identity from "../features/onboarding/Step1Identity";
import Step2Archetype from "../features/onboarding/Step2Archetype";
import Step3Income from "../features/onboarding/Step3Income";
import Step4Targets from "../features/onboarding/Step4Targets";
import DashboardScreen from "../screens/DashboardScreen";
import AppShell from "../components/AppShell";
import { RouteColors } from "../constants/theme";

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
          {step > TOTAL_STEPS && <DashboardScreen data={data} />}
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
    backgroundColor: RouteColors.inkDeep,
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
    backgroundColor: RouteColors.ink,
    borderRadius: 44,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(216,102,74,0.3)",
    ...Platform.select({
      web: {
        boxShadow: "0 40px 120px rgba(0,0,0,0.55), 0 0 0 1px rgba(240,231,213,0.04), 0 0 42px rgba(216,102,74,0.08)",
      } as any,
    }),
  },
  statusBar: {
    height: 50,
    backgroundColor: RouteColors.ink,
  },
  homeBar: {
    height: 34,
    backgroundColor: RouteColors.ink,
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