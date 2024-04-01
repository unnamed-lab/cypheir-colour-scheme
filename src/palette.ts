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


  Palette Scheme:
  - Primary
  - Secondary
  - Accents
  - Neutrals
*/

import {
  analogous,
  complimentary,
  decToHex,
  getColour,
  hexToRGB,
  monochrome,
  rgbToHex,
  tetradic,
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

function buildPaletteAlpha(
  colour: ColourInput,
  toHex: boolean = true,
  offset: number = 0
) {
  const limOffset = Math.min(Math.max(offset, 0), 90);
  const hexCode = getColour(colour);
  let rgb = hexToRGB(hexCode);
  let secondary = complimentary(rgb, 1);
  let accent = analogous(rgb, limOffset);

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

function buildPaletteBeta(colour: ColourInput, offset: number = 0) {
  const limOffset = Math.min(Math.max(offset, 0), 90);
  const hexCode = getColour(colour);
  let rgb = hexToRGB(hexCode);
  let secondary = triadic(rgb, limOffset);
  let accent = complimentary(rgb, [45, 90, 135]);
  if (typeof accent !== "string" && Array.isArray(accent)) {
    accent;
  }

  return { primary: hexCode, secondary, accent };
}

function buildPaletteGamma(colour: ColourInput, offset: number = 0) {
  const limOffset = Math.min(Math.max(offset, 0), 90);
  const hexCode = getColour(colour);
  let rgb = hexToRGB(hexCode);
  let secondary = triadic(rgb, 25 + limOffset);
  let accent = complimentary(rgb, [45, 90, 135]);
  if (typeof accent !== "string" && Array.isArray(accent)) {
    accent;
  }

  return { primary: hexCode, secondary, accent };
}

function buildProPalette(colour: ColourInput) {
  const hexCode = getColour(colour);
  let rgb = hexToRGB(hexCode);
  let colr = tetradic(rgb);
  let palette: Array<string[]> = [];
  colr.map((el) => {
    if (typeof el !== "string") el = getColour(el);
    const variants = monochrome(el);
    palette.push(variants);
  });

  return palette;
}

function buildProPaletteBeta(colour: ColourInput) {
  const hexCode = getColour(colour);
  let rgb = hexToRGB(hexCode);
  let colr = complimentary(rgb, [150, 270]);
  let palette: Array<string[]> = [];

  if (Array.isArray(colr) && typeof colr[0] === "string")
    colr.map((el) => {
      if (typeof el !== "string") el = getColour(el);
      const variants = monochrome(el);
      palette.push(variants);
    });

  return palette;
}

function buildProPaletteMix(colour: ColourInput) {
  //  Generates random number
  const randIndex = (arr: string[]): string => {
    const rand = Math.floor(Math.abs(Math.random() * arr.length));
    return arr[rand];
  };

  const harmonyMixer = (colour: string): (string | RGB)[] => {
    const RGB = hexToRGB(colour);
    const offset = Math.floor(Math.abs(Math.random() * (90 - 15) + 15));
    let arr: (string | RGB)[] = [];

    const harmony = tetradic(analogous(RGB), offset);
    if (Array.isArray(harmony) && typeof harmony[0] === "string") arr = harmony;

    return arr;
  };

  const hexCode = getColour(colour);
  const rgb = hexToRGB(hexCode);
  const adj = analogous(rgb);
  let adjComp = complimentary(adj, 2);

  let palette: { base: Array<string>; accent: Array<string> } = {
    base: [],
    accent: [],
  };
  let basePalette: Array<string> = [
    rgbToHex(rgb),
    rgbToHex(adj),
    Array.isArray(adjComp) && typeof adjComp[0] === "string" ? adjComp[0] : "",
    Array.isArray(adjComp) && typeof adjComp[1] === "string" ? adjComp[1] : "",
  ];
  const trial = randIndex(basePalette);
  const harmony = harmonyMixer(trial);

  palette.base = basePalette;
  palette.accent = harmony.filter((el): el is string => typeof el === "string");

  return palette;
}

export {
  generateRandomColour,
  buildPaletteAlpha,
  buildPaletteBeta,
  buildPaletteGamma,
  buildProPalette,
  buildProPaletteBeta,
  buildProPaletteMix,
};
