import type { GomiCategoryId } from "./types";

/**
 * Tailwind class names must appear as literal strings somewhere the JIT
 * scanner reads (see tailwind.config.ts content globs) -- a template like
 * `bg-${color}-100` would not be picked up at build time. Hence this static
 * lookup table instead of building class names from GomiCategory.color.
 */
export interface CategoryStyle {
  bg: string;
  bgStrong: string;
  border: string;
  text: string;
  ring: string;
}

export const CATEGORY_STYLES: Record<GomiCategoryId, CategoryStyle> = {
  moeru: {
    bg: "bg-red-50",
    bgStrong: "bg-red-100",
    border: "border-red-300",
    text: "text-red-700",
    ring: "ring-red-400",
  },
  moenai: {
    bg: "bg-slate-50",
    bgStrong: "bg-slate-100",
    border: "border-slate-300",
    text: "text-slate-700",
    ring: "ring-slate-400",
  },
  shigen: {
    bg: "bg-emerald-50",
    bgStrong: "bg-emerald-100",
    border: "border-emerald-300",
    text: "text-emerald-700",
    ring: "ring-emerald-400",
  },
  plastic: {
    bg: "bg-sky-50",
    bgStrong: "bg-sky-100",
    border: "border-sky-300",
    text: "text-sky-700",
    ring: "ring-sky-400",
  },
  pet: {
    bg: "bg-cyan-50",
    bgStrong: "bg-cyan-100",
    border: "border-cyan-300",
    text: "text-cyan-700",
    ring: "ring-cyan-400",
  },
  sodai: {
    bg: "bg-amber-50",
    bgStrong: "bg-amber-100",
    border: "border-amber-300",
    text: "text-amber-800",
    ring: "ring-amber-400",
  },
  kaden: {
    bg: "bg-indigo-50",
    bgStrong: "bg-indigo-100",
    border: "border-indigo-300",
    text: "text-indigo-700",
    ring: "ring-indigo-400",
  },
  kiken: {
    bg: "bg-rose-50",
    bgStrong: "bg-rose-200",
    border: "border-rose-300",
    text: "text-rose-800",
    ring: "ring-rose-400",
  },
  special: {
    bg: "bg-purple-50",
    bgStrong: "bg-purple-100",
    border: "border-purple-300",
    text: "text-purple-700",
    ring: "ring-purple-400",
  },
};
