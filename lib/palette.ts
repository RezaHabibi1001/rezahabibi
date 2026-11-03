/** Canonical project palette — keep in sync with `:root` tokens in `app/globals.css`. */
export const palette = {
  background: "#f4ede3",
  surface: "#e7dccb",
  raised: "#f8f5f0",
  text: "#33291f",
  surfaceText: "#33291f",
  raisedText: "#33291f",
  raisedMuted: "#76695b",
  muted: "#76695b",
  mutedOnFill: "#6b6053",
  accent: "#a0703f",
  onAccent: "#0d0d0d",
  accentHover: "#ab8156",
  accentPressed: "#b58f69",
  tint: "#eadecf",
  tintText: "#825b33",
  border: "#c8beae",
  controlBorder: "#978d7f",
  inverse: "#2a291f",
  inverseText: "#f4ede3",
  focus: "#a0703f",
} as const;

export type PaletteColor = (typeof palette)[keyof typeof palette];
