import { ReactNode } from "react";
import { View, Text, StyleSheet } from "react-native";
import { RouteColors } from "../constants/theme";

interface Props {
  step: number;
  total: number;
  done: boolean;
  children: ReactNode;
}

export default function AppShell({ step, total, done, children }: Props) {
  return (
    <View style={styles.shell}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          {/* F1-style logo mark */}
          <View style={styles.logoMark}>
            <Text style={styles.logoF}>F</Text>
          </View>
          <View style={styles.logoTextGroup}>
            <Text style={styles.logoName}>FIN</Text>
            <View style={styles.logoOne}>
              <Text style={styles.logoOneText}>1</Text>
            </View>
          </View>
        </View>

        {!done && (
          <View style={styles.lapRow}>
            <Text style={styles.lapLabel}>LAP</Text>
            <Text style={styles.lapValue}>
              {step}/{total}
            </Text>
          </View>
        )}
      </View>

      {/* Track strip */}
      {!done && <TrackStrip current={step} total={total} />}

      {/* Content */}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

function TrackStrip({ current, total }: { current: number; total: number }) {
  return (
    <View style={styles.trackWrap}>
      <View style={styles.trackBase} />
      <View
        style={[
          styles.trackFill,
          { width: `${((current - 1) / (total - 1)) * 100}%` as any },
        ]}
      />
      {Array.from({ length: total }, (_, i) => {
        const idx = i + 1;
        const done = idx < current;
        const active = idx === current;
        const pct = (i / (total - 1)) * 100;
        return (
          <View
            key={idx}
            style={[
              styles.node,
              { left: `${pct}%` as any },
              done && styles.nodeDone,
              active && styles.nodeActive,
            ]}
          >
            <Text style={[styles.nodeText, (done || active) && styles.nodeTextActive]}>
              {done ? "✓" : idx}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const SIGNAL = RouteColors.signal;

const styles = StyleSheet.create({
  shell: {
    flex: 1,
    backgroundColor: RouteColors.ink,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(216,102,74,0.2)",
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logoMark: {
    width: 32,
    height: 32,
    backgroundColor: SIGNAL,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ skewX: "-8deg" }],
  },
  logoF: {
    fontFamily: "Barlow Condensed",
    fontWeight: "900",
    fontSize: 20,
    color: RouteColors.text,
    letterSpacing: -1,
    transform: [{ skewX: "8deg" }],
  },
  logoTextGroup: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 2,
  },
  logoName: {
    fontFamily: "Barlow Condensed",
    fontWeight: "900",
    fontSize: 26,
    color: RouteColors.text,
    letterSpacing: 2,
  },
  logoOne: {
    backgroundColor: SIGNAL,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 3,
    marginBottom: 2,
    transform: [{ skewX: "-6deg" }],
  },
  logoOneText: {
    fontFamily: "Barlow Condensed",
    fontWeight: "900",
    fontSize: 16,
    color: RouteColors.text,
    transform: [{ skewX: "6deg" }],
  },
  lapRow: {
    alignItems: "flex-end",
  },
  lapLabel: {
    fontFamily: "JetBrains Mono",
    fontSize: 9,
    color: "#666",
    letterSpacing: 2,
  },
  lapValue: {
    fontFamily: "Barlow Condensed",
    fontWeight: "700",
    fontSize: 18,
    color: SIGNAL,
    letterSpacing: 1,
  },
  trackWrap: {
    marginHorizontal: 24,
    marginTop: 20,
    marginBottom: 28,
    height: 28,
    position: "relative",
    justifyContent: "center",
  },
  trackBase: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: RouteColors.line,
    top: 13,
  },
  trackFill: {
    position: "absolute",
    left: 0,
    height: 2,
    backgroundColor: SIGNAL,
    top: 13,
  },
  node: {
    position: "absolute",
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: RouteColors.panel,
    borderWidth: 2,
    borderColor: "#333",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -14,
  },
  nodeDone: {
    backgroundColor: SIGNAL,
    borderColor: SIGNAL,
  },
  nodeActive: {
    backgroundColor: RouteColors.ink,
    borderColor: SIGNAL,
    // web only
    ...(({ boxShadow: `0 0 12px ${SIGNAL}` }) as any),
  },
  nodeText: {
    fontFamily: "Barlow Condensed",
    fontWeight: "700",
    fontSize: 12,
    color: "#555",
  },
  nodeTextActive: {
    color: RouteColors.text,
  },
  content: {
    flex: 1,
  },
});
