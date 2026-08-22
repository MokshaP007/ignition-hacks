import { useRef, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  SVG, Path, Circle, G, Defs, LinearGradient, Stop,
  Filter, FeGaussianBlur, FeMerge, FeMergeNode, Rect,
  SvgText, Line, Polygon, Ellipse,
} from "../svg/WebSVG";
import type { Transaction } from "../screens/DashboardScreen";

// ── Circuit centerline path (viewBox 0 0 342 480) ─────────────────────────
const TRACK_PATH =
  "M 100 55 L 242 55 " +
  "C 284 55 308 88 308 138 " +
  "L 308 202 " +
  "C 308 242 288 262 260 267 " +
  "L 232 270 " +
  "C 210 272 198 288 201 315 " +
  "C 204 338 220 352 222 378 " +
  "C 224 402 210 424 183 430 " +
  "L 162 432 " +
  "C 138 432 118 418 112 394 " +
  "L 104 368 " +
  "C 97 346 90 318 88 286 " +
  "C 85 254 70 234 52 220 " +
  "L 46 178 " +
  "C 42 142 52 96 80 68 " +
  "C 90 58 100 55 100 55 Z";

// ── Checkpoints ────────────────────────────────────────────────────────────
const CHECKPOINTS = [
  { label: "UW",      full: "UWaterloo",      t: 0.22, x: 306, y: 172, side: "right" },
  { label: "WLU",     full: "Wilfrid Laurier", t: 0.44, x: 210, y: 330, side: "right" },
  { label: "Uptown",  full: "Uptown Waterloo", t: 0.57, x: 162, y: 432, side: "left" },
  { label: "Google",  full: "Google KW",       t: 0.72, x:  88, y: 328, side: "left" },
];

const RED   = "#E10600";
const CYAN  = "#00D4E8";
const ROAD  = "#1c1c1c";
const CURB  = "#2d2d2d";
const GRASS = "#0d1a0d";

interface Props {
  carT: number;        // 0–1 along the track
  carLane: number;     // –1 | 0 | 1
  level: number;
  transactions: Transaction[];
}

export default function WaterlooTrack({ carT, carLane, level, transactions }: Props) {
  const pathRef = useRef<any>(null);
  const [pathLen, setPathLen]   = useState(0);
  const [car, setCar]           = useState({ x: 171, y: 55, angle: 0 });
  const [activeCP, setActiveCP] = useState<number | null>(null);

  // Compute total path length once SVG mounts
  useEffect(() => {
    if (pathRef.current?.getTotalLength) {
      setPathLen(pathRef.current.getTotalLength());
    }
  }, []);

  // Update car position whenever carT or pathLen changes
  useEffect(() => {
    if (!pathRef.current || !pathLen) return;
    const t  = Math.max(0, Math.min(carT, 1));
    const pt = pathRef.current.getPointAtLength(t * pathLen);
    const d  = 3;
    const p2 = pathRef.current.getPointAtLength(Math.min((t + d / pathLen) * pathLen, pathLen));
    const angle = Math.atan2(p2.y - pt.y, p2.x - pt.x) * (180 / Math.PI);

    // Lane offset (perpendicular to heading)
    const perp = (angle + 90) * (Math.PI / 180);
    const laneOff = carLane * 7;
    setCar({ x: pt.x + Math.cos(perp) * laneOff, y: pt.y + Math.sin(perp) * laneOff, angle });

    // Detect checkpoint proximity
    const nearby = CHECKPOINTS.findIndex(cp => Math.abs(cp.t - carT) < 0.05);
    setActiveCP(nearby >= 0 ? nearby : null);
  }, [carT, carLane, pathLen]);

  // Most recent transaction
  const lastTx = transactions[0];

  return (
    <View style={styles.container}>
      {SVG({
        width: "100%",
        height: "100%",
        viewBox: "0 0 342 480",
        style: { display: "block" },
        children: [

          // ── Defs ────────────────────────────────────────────────────────
          Defs({ key: "defs", children: [
            LinearGradient({
              key: "xpGrad", id: "xpGrad",
              x1: "0%", y1: "0%", x2: "100%", y2: "0%",
              children: [
                Stop({ key: "s1", offset: "0%",   stopColor: RED,  stopOpacity: 1 }),
                Stop({ key: "s2", offset: "100%",  stopColor: CYAN, stopOpacity: 1 }),
              ],
            }),
            Filter({ key: "glow", id: "glow", x: "-50%", y: "-50%", width: "200%", height: "200%",
              children: [
                FeGaussianBlur({ key: "b1", stdDeviation: "3", result: "blur" }),
                FeMerge({ key: "m1", children: [
                  FeMergeNode({ key: "mn1", in: "blur" }),
                  FeMergeNode({ key: "mn2", in: "SourceGraphic" }),
                ]}),
              ],
            }),
            Filter({ key: "carGlow", id: "carGlow", x: "-100%", y: "-100%", width: "300%", height: "300%",
              children: [
                FeGaussianBlur({ key: "b2", stdDeviation: "4", result: "blur" }),
                FeMerge({ key: "m2", children: [
                  FeMergeNode({ key: "mn3", in: "blur" }),
                  FeMergeNode({ key: "mn4", in: "SourceGraphic" }),
                ]}),
              ],
            }),
          ]}),

          // ── Grass background ────────────────────────────────────────────
          Rect({ key: "bg", x: 0, y: 0, width: 342, height: 480, fill: GRASS }),

          // ── Road layers ─────────────────────────────────────────────────
          // Outer curb (widest)
          Path({ key: "curb",  d: TRACK_PATH, fill: "none", stroke: CURB,  strokeWidth: 52, strokeLinejoin: "round", strokeLinecap: "round" }),
          // Curb stripe (red/white alternating — simplified as a slightly narrower red)
          Path({ key: "curbR", d: TRACK_PATH, fill: "none", stroke: RED,   strokeWidth: 46, strokeLinejoin: "round", strokeLinecap: "round", strokeDasharray: "12 12", opacity: 0.18 }),
          // Road surface
          Path({ key: "road",  d: TRACK_PATH, fill: "none", stroke: ROAD,  strokeWidth: 38, strokeLinejoin: "round", strokeLinecap: "round" }),
          // Road surface gradient tint
          Path({ key: "roadG", d: TRACK_PATH, fill: "none", stroke: "url(#xpGrad)", strokeWidth: 38, strokeLinejoin: "round", strokeLinecap: "round", opacity: 0.04 }),
          // Center lane marking (dashed white)
          Path({ key: "lane",  d: TRACK_PATH, fill: "none", stroke: "rgba(255,255,255,0.15)", strokeWidth: 1, strokeDasharray: "8 10", strokeLinejoin: "round", strokeLinecap: "round" }),

          // ── Start / Finish line ──────────────────────────────────────────
          G({ key: "sf", children: [
            Rect({ x: 158, y: 48, width: 28, height: 14, fill: "white", rx: 1 }),
            Rect({ x: 158, y: 48, width: 7,  height: 7,  fill: "black" }),
            Rect({ x: 172, y: 48, width: 7,  height: 7,  fill: "black" }),
            Rect({ x: 158, y: 55, width: 7,  height: 7,  fill: "black" }),
            Rect({ x: 172, y: 55, width: 7,  height: 7,  fill: "black" }),
          ]}),

          // ── Sector dividers ─────────────────────────────────────────────
          // S1/S2 boundary (approx at UW exit)
          Path({ key: "s1s2", d: "M 295 210 L 320 210", stroke: "rgba(255,255,255,0.3)", strokeWidth: 1.5, strokeLinecap: "round" }),
          // S2/S3 boundary (approx at south hairpin)
          Path({ key: "s2s3", d: "M 145 432 L 180 450", stroke: "rgba(255,255,255,0.3)", strokeWidth: 1.5, strokeLinecap: "round" }),
          // DRS zone indicator on main straight
          Path({ key: "drs",  d: "M 130 50 L 230 50", stroke: CYAN, strokeWidth: 2, strokeLinecap: "round", opacity: 0.5 }),
          SvgText({ key: "drsTxt", x: 180, y: 44, textAnchor: "middle", fontSize: 6, fill: CYAN, opacity: 0.7, fontFamily: "JetBrains Mono", children: "DRS ZONE" }),

          // ── Infield elements ────────────────────────────────────────────
          // Waterloo infield label
          SvgText({ key: "wl", x: 171, y: 245, textAnchor: "middle", fontSize: 9,
            fill: "rgba(255,255,255,0.12)", fontFamily: "Barlow Condensed", fontWeight: "bold",
            letterSpacing: 3, children: "WATERLOO" }),
          SvgText({ key: "sc", x: 171, y: 258, textAnchor: "middle", fontSize: 6,
            fill: "rgba(255,255,255,0.08)", fontFamily: "JetBrains Mono",
            children: "STREET CIRCUIT" }),

          // ── Checkpoint markers ───────────────────────────────────────────
          ...CHECKPOINTS.map((cp, i) => {
            const isActive  = activeCP === i;
            const isPassed  = carT > cp.t;
            const color     = isPassed ? (isActive ? CYAN : "rgba(0,212,232,0.6)") : "rgba(255,255,255,0.3)";
            const labelX    = cp.side === "right" ? cp.x + 20 : cp.x - 20;
            const anchor    = cp.side === "right" ? "start" : "end";
            return G({ key: `cp${i}`, children: [
              // connector line
              Line({ key: "l", x1: cp.x, y1: cp.y, x2: labelX, y2: cp.y,
                stroke: color, strokeWidth: 1, opacity: 0.6 }),
              // dot
              Circle({ key: "c", cx: cp.x, cy: cp.y, r: isActive ? 5 : 3.5,
                fill: isPassed ? CYAN : "#333", stroke: color, strokeWidth: 1.5,
                filter: isActive ? "url(#glow)" : undefined }),
              // label
              SvgText({ key: "t", x: labelX + (cp.side === "right" ? 3 : -3),
                y: cp.y - 5, fontSize: 7, fill: color, fontFamily: "Barlow Condensed",
                fontWeight: "bold", textAnchor: anchor, children: cp.label }),
              // full name
              SvgText({ key: "f", x: labelX + (cp.side === "right" ? 3 : -3),
                y: cp.y + 5, fontSize: 5.5, fill: "rgba(255,255,255,0.35)",
                fontFamily: "JetBrains Mono", textAnchor: anchor, children: cp.full }),
            ]});
          }),

          // ── Toronto gate (locked at bottom of circuit) ───────────────────
          level < 2 && G({ key: "togate", children: [
            Rect({ x: 130, y: 458, width: 82, height: 20, rx: 4,
              fill: "rgba(0,0,0,0.8)", stroke: "rgba(200,168,75,0.5)", strokeWidth: 1 }),
            SvgText({ x: 171, y: 471, textAnchor: "middle", fontSize: 6.5,
              fill: "#c8a84b", fontFamily: "Barlow Condensed", fontWeight: "bold",
              letterSpacing: 1, children: "🔒  TORONTO  →" }),
          ]}),

          level >= 2 && G({ key: "toopen", children: [
            Rect({ x: 130, y: 458, width: 82, height: 20, rx: 4,
              fill: "rgba(0,212,232,0.15)", stroke: CYAN, strokeWidth: 1 }),
            SvgText({ x: 171, y: 471, textAnchor: "middle", fontSize: 6.5,
              fill: CYAN, fontFamily: "Barlow Condensed", fontWeight: "bold",
              letterSpacing: 1, children: "TORONTO UNLOCKED" }),
          ]}),

          // ── XP progress overlay on track ─────────────────────────────────
          Path({ key: "xpPath", d: TRACK_PATH, fill: "none",
            stroke: "url(#xpGrad)", strokeWidth: 38,
            strokeLinejoin: "round", strokeLinecap: "round",
            strokeDasharray: `${carT * 1000} 1000`, opacity: 0.12 }),

          // ── Speed trail behind car ───────────────────────────────────────
          carT > 0 && Path({
            key: "trail",
            d: TRACK_PATH, fill: "none",
            stroke: CYAN, strokeWidth: 2,
            strokeLinejoin: "round", strokeLinecap: "round",
            strokeDashoffset: 0,
            strokeDasharray: `${Math.max(0, carT * 1000 - 20)} 980`,
            opacity: 0.4,
          }),

          // ── Car sprite ───────────────────────────────────────────────────
          G({
            key: "car",
            transform: `translate(${car.x}, ${car.y}) rotate(${car.angle})`,
            filter: "url(#carGlow)",
            children: [
              // Glow halo
              Ellipse({ cx: 0, cy: 2, rx: 8, ry: 4, fill: RED, opacity: 0.35 }),
              // Car body (F1 silhouette)
              Polygon({ points: "9,0 -5,-4 -8,0 -5,4", fill: RED }),
              // Cockpit
              Ellipse({ cx: 1, cy: 0, rx: 3, ry: 2, fill: "#222" }),
              // Front wing
              Polygon({ points: "9,0 7,-6 10,-6 10,6 7,6", fill: RED, opacity: 0.8 }),
              // Rear wing
              Polygon({ points: "-7,-6 -7,6 -9,6 -9,-6", fill: RED, opacity: 0.7 }),
              // Cyan accent
              Rect({ x: -4, y: -1, width: 6, height: 2, fill: CYAN, rx: 0.5 }),
            ],
          }),

          // ── Live timing card (glassmorphism) ─────────────────────────────
          lastTx && G({ key: "timing", children: [
            Rect({ x: 4, y: 4, width: 90, height: 38, rx: 5,
              fill: "rgba(11,11,11,0.85)", stroke: "rgba(255,255,255,0.08)", strokeWidth: 1 }),
            SvgText({ x: 10, y: 15, fontSize: 5.5, fill: "rgba(255,255,255,0.4)",
              fontFamily: "JetBrains Mono", children: "LAST LOG" }),
            SvgText({ x: 10, y: 26, fontSize: 8, fill: lastTx.type === "earn" ? CYAN : lastTx.type === "save" ? "#2ECC71" : "#FF6B6B",
              fontFamily: "Barlow Condensed", fontWeight: "bold",
              children: `${lastTx.type.toUpperCase()}  $${lastTx.amount}` }),
            SvgText({ x: 10, y: 36, fontSize: 5.5, fill: "#c8a84b",
              fontFamily: "JetBrains Mono", children: `+${lastTx.xpEarned} XP` }),
          ]}),

        ],
      })}

      {/* Hidden SVG path for getPointAtLength – must be in DOM */}
      {SVG({
        style: { position: "absolute", width: 0, height: 0, overflow: "hidden" },
        children: Path({ ref: pathRef, d: TRACK_PATH }),
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GRASS,
    position: "relative",
  },
});
