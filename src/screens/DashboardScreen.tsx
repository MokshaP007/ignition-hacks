import { useState, useCallback } from "react"
import { View, StyleSheet } from "react-native"
import type { OnboardingData } from "../app"
import TopHUD from "../hud/TopHUD"
import ProfileDropdown from "../hud/ProfileDropdown"
import WaterlooTrack from "../track/WaterlooTrack"
import BottomBar from "../controls/BottomBar"
import LogBottomSheet from "../modal/LogBottomSheet"
import TorontoGate from "../modal/TorontoGate"

export type Transaction = {
  id: string
  type: "spend" | "save" | "earn"
  amount: number
  category: string
  xpEarned: number
  timestamp: Date
}

const XP_MAX = 200

interface Props {
  data: OnboardingData
}

export default function DashboardScreen({ data }: Props) {
  const [xp, setXp] = useState(0)
  const [level, setLevel] = useState(1)
  const [streak, setStreak] = useState(1)
  const [carT, setCarT] = useState(0)
  const [carLane, setCarLane] = useState(0)
  const [showProfile, setShowProfile] = useState(false)
  const [showLog, setShowLog] = useState(false)
  const [torontoVisible, setTorontoVisible] = useState(false)
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const addXP = useCallback((amount: number) => {
    setXp((prev) => {
      const next = Math.min(prev + amount, XP_MAX)
      setCarT(next / XP_MAX)
      if (next >= XP_MAX && prev < XP_MAX) {
        setTimeout(() => {
          setLevel(2)
          setTorontoVisible(true)
        }, 600)
      }
      return next
    })
  }, [])

  const handleSteer = (dir: -1 | 1) => {
    setCarLane((prev) => Math.max(-1, Math.min(1, prev + dir)))
    addXP(3)
  }

  const handleLog = (tx: Transaction) => {
    setTransactions((prev) => [tx, ...prev])
    addXP(tx.xpEarned)
    setStreak((prev) => prev + 1)
    setShowLog(false)
  }

  return (
    <View style={styles.screen}>
      {/* Top HUD */}
      <TopHUD
        level={level}
        xp={xp}
        xpMax={XP_MAX}
        streak={streak}
        driverName={data.name}
        archetypes={data.archetypes}
        onAvatarPress={() => setShowProfile((v) => !v)}
      />

      {/* Track area */}
      <View style={styles.trackWrap}>
        <WaterlooTrack
          carT={carT}
          carLane={carLane}
          level={level}
          transactions={transactions}
        />
      </View>

      {/* Steering + FAB */}
      <BottomBar
        onSteerLeft={() => handleSteer(-1)}
        onSteerRight={() => handleSteer(1)}
        onFABPress={() => setShowLog(true)}
        level={level}
        xp={xp}
        xpMax={XP_MAX}
      />

      {/* ─── Overlays ────────────────────────────────────────────── */}
      {showProfile && (
        <ProfileDropdown
          data={data}
          transactions={transactions}
          xp={xp}
          streak={streak}
          onClose={() => setShowProfile(false)}
        />
      )}

      {showLog && (
        <LogBottomSheet
          onClose={() => setShowLog(false)}
          onSubmit={handleLog}
          income={Number(data.income) || 0}
          budget={Number(data.spendingBudget) || 0}
        />
      )}

      {torontoVisible && (
        <TorontoGate
          driverName={data.name}
          onContinue={() => setTorontoVisible(false)}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0b0b0b",
  },
  trackWrap: {
    flex: 1,
    overflow: "hidden",
  },
})
