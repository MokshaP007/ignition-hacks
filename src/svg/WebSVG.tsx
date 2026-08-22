// SVG primitives for react-native-web: Vite renders these as real DOM SVG
import { createElement } from "react";

export const SVG = (p: any) => createElement("svg", p);
export const Path = (p: any) => createElement("path", p);
export const Circle = (p: any) => createElement("circle", p);
export const Rect = (p: any) => createElement("rect", p);
export const G = (p: any) => createElement("g", p);
export const Polygon = (p: any) => createElement("polygon", p);
export const Line = (p: any) => createElement("line", p);
export const SvgText = (p: any) => createElement("text", p);
export const Defs = (p: any) => createElement("defs", p);
export const LinearGradient = (p: any) => createElement("linearGradient", p);
export const RadialGradient = (p: any) => createElement("radialGradient", p);
export const Stop = (p: any) => createElement("stop", p);
export const Filter = (p: any) => createElement("filter", p);
export const FeGaussianBlur = (p: any) => createElement("feGaussianBlur", p);
export const FeMerge = (p: any) => createElement("feMerge", p);
export const FeMergeNode = (p: any) => createElement("feMergeNode", p);
export const ClipPath = (p: any) => createElement("clipPath", p);
export const Ellipse = (p: any) => createElement("ellipse", p);
