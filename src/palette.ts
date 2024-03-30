/* 
    Creating Your Palette:
        Start with a key color (often the dominant hue in your design).
        Choose a primary color (usually the key color).
        Add secondary colors (harmonious companions).
        Introduce accent colors (for highlights and emphasis).
        Consider the context (branding, mood, target audience).
    
    Choosing Accent Colors:
        No strict rules: There are no fixed rules for choosing accent colors, but consider the following guidelines:
        Set the mood: Think about the overall tone you want to create in the room. Choose an accent color that aligns with that mood.
        Color harmony: Look at the existing color scheme in the room. Consider using complementary or analogous colors for harmonious results.
        Contrast: Accent colors should stand out against the primary colors. Differences in hue, value, or saturation help achieve proper contrast.
*/

import {
  analogous,
  complimentary,
  decToHex,
  getColour,
  hexToRGB,
  rgbToHex,
  triadic,
} from "./functions";
import { RGB } from "./interfaces";
import { ColourInput } from "./types";

function generateRandomColour() {
  const MAXHEX: 16777215 = 16777215;
  const MINHEX: 0 = 0;
  const rand = Math.floor(Math.random() * (MAXHEX - MINHEX + 1)) + MINHEX;

  return decToHex(rand);
}

function buildPaletteAlpha(colour: ColourInput, toHex: boolean = true) {
  const hexCode = getColour(colour);
  let rgb = hexToRGB(hexCode);
  let secondary = complimentary(rgb, 1);
  let accent = analogous(rgb);

  if (toHex && !Array.isArray(secondary) && typeof secondary === "string") {
    secondary;
  }
  return {
    primary: toHex ? hexCode : hexToRGB(hexCode),
    secondary: toHex
      ? secondary
      : typeof secondary === "string"
      ? hexToRGB(secondary)
      : undefined,
    accent: toHex ? rgbToHex(accent) : accent,
  };
}

function buildPaletteBeta(colour: ColourInput) {
  const hexCode = getColour(colour);
  let rgb = hexToRGB(hexCode);
  let secondary = triadic(rgb);
  let accent = complimentary(rgb, [45, 90, 135]);
  if (typeof accent !== "string" && Array.isArray(accent)) {
    accent;
  }

  return { primary: hexCode, secondary, accent };
}

function buildPaletteGamma(colour: ColourInput) {
  const hexCode = getColour(colour);
  let rgb = hexToRGB(hexCode);
  let secondary = triadic(rgb, 30);
  let accent = complimentary(rgb, [30, 45, 60]);
  if (typeof accent !== "string" && Array.isArray(accent)) {
    accent;
  }

  return { primary: hexCode, secondary, accent };
}
export {
  generateRandomColour,
  buildPaletteAlpha,
  buildPaletteBeta,
  buildPaletteGamma,
};
