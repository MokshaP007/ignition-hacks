import { ReactNode } from "react";
import { View, Text, ScrollView, StyleSheet, Platform } from "react-native";

interface Props {
  badge?: string;
  headline: string;
  subtext: string;
  children: ReactNode;
  actions: ReactNode;
}

export default function RNCard({ badge, headline, subtext, children, actions }: Props) {
  return (
    <View style={styles.outer}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header block */}
        <View style={styles.headerBlock}>
          {badge && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          )}
          <Text style={styles.headline}>{headline}</Text>
          <Text style={styles.subtext}>{subtext}</Text>
        </View>

        {/* Red rule */}
        <View style={styles.rule} />

        {/* Fields */}
        <View style={styles.fields}>{children}</View>
      </ScrollView>

      {/* Actions pinned at bottom */}
      <View style={styles.actions}>{actions}</View>
    </View>
  );
}

const RED = "#E10600";

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 4,
    paddingBottom: 16,
    gap: 0,
  },
  headerBlock: {
    gap: 8,
    marginBottom: 20,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(225,6,0,0.1)",
    borderWidth: 1,
    borderColor: "rgba(225,6,0,0.3)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 4,
  },
  badgeText: {
    fontFamily: "JetBrains Mono",
    fontSize: 9,
    color: RED,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  headline: {
    fontFamily: "Barlow Condensed",
    fontWeight: "800",
    fontSize: 30,
    color: "#ffffff",
    letterSpacing: -0.5,
    lineHeight: 34,
  },
  subtext: {
    fontFamily: "Barlow",
    fontWeight: "400",
    fontSize: 14,
    color: "#888",
    lineHeight: 20,
  },
  rule: {
    height: 2,
    backgroundColor: RED,
    width: 32,
    borderRadius: 1,
    marginBottom: 24,
  },
  fields: {
    gap: 16,
  },
  actions: {
    paddingTop: 16,
    paddingBottom: 8,
    gap: 10,
    flexDirection: "row",
  },
});
