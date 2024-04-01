import { colourLookup } from "./colourLookup";
import {
  analogous,
  cmykToRGB,
  complimentary,
  getColour,
  grayscale,
  hexToDec,
  hexToRGB,
  hslToRGB,
  monochrome,
  rgbToCMYK,
  rgbToHex,
  rgbToHSL,
  sortByHue,
  tetradic,
  triadic,
} from "./functions";
import { CMYK, HSL, RGB } from "./interfaces";
import {
  buildPaletteAlpha,
  buildPaletteBeta,
  buildPaletteGamma,
  buildProPalette,
  buildProPaletteBeta,
  buildProPaletteMix,
  generateRandomColour,
} from "./palette";
import { ColourInput } from "./types";

/**
 * Create a class to store your colour scheme and generate preferences.
 */
export class ColourScheme {
  protected colourCode: ColourInput;
  colourHex: string | undefined; // get the procssed hex value

  constructor(colourCode: ColourInput) {
    this.colourCode = colourCode;
    this.colourHex = getColour(this.colourCode);
  }

  /**
   * Gets the colour input as HEX codes.
   * @returns Returns HEX string value.
   */
  getColour(): string | undefined {
    return this.colourHex;
  }

  /**
   * Gets the bae colour in RGB format {red: x, green: y, blue: z}.
   * @returns Returns a RGB object.
   */
  getRGB() {
    return hexToRGB(this.colourHex);
  }

  /**
   * Get the Monochrome of the base colour.
   * @returns Returns an array of the base colour monochrome
   */
  Monochrome(): Array<string> {
    const hexArr = monochrome(this.colourHex);
    return hexArr.filter((el, index) => {
      return index === 0 || el !== hexArr[index - 1];
    });
  }

  /**
   * Gets HSL values from the base colour
   * @returns Returns a HSL object {hue: x, saturation: y, lightness: z}.
   */
  getHSL() {
    return rgbToHSL(hexToRGB(this.colourHex));
  }

  /**
   * Gets the Complimentary colour scheme of the base colour.
   * @param {number | Array<number>} variation : Set the different variants of output
   * 1 = 180deg, 2 = [150deg, 210deg], [90, 120, 270] = [90deg, 120deg, 270deg].
   * @param {boolean} toHex: Converts the output to HEX code (default: true)
   * @returns Returns a string or a RGB object or an array of strings or RGB objects.
   */
  Compliments(variation: 1 | 2 | Array<number>, toHex: boolean = true) {
    return complimentary(hexToRGB(this.colourHex), variation, toHex);
  }

  /**
   * Gets the Analogous colour scheme of the base colour.
   * @param {number} offset : Set an offset degree.
   * @returns Return a RGB object {red: x, green: y, blue: z}.
   */
  Analogous(offset: number = 0) {
    return analogous(hexToRGB(this.colourHex), offset);
  }

  /**
   * Get the Triadic colour scheme of the base colour.
   * @param {number | [number, number]} offset: Set offeset between the two triadic angled colours.
   * @param {boolean} toHex: to convert the output to HEX.
   * @returns Returns a string or RGB object array of the triadic colours.
   */
  Tradic(offset: number | [number, number] = 0, toHex: boolean = true) {
    return triadic(hexToRGB(this.colourHex), offset, toHex);
  }

  /**
   * Get the Tetradic colour scheme of the base colour.
   * @param {number} offset: Set offeset between the two tetradic angled colours.
   * @param {boolean} toHex: to convert the output to HEX.
   * @returns Returns a string or RGB object array of the tetradic colours.
   */
  Tetradic(offset: number = 0, toHex: boolean = true) {
    return tetradic(hexToRGB(this.colourHex), offset, toHex);
  }

  /**
   * Generates an array of the base colour to grayscale shades.
   * @param {string} code - The HEX code of the base colour.
   * @param {number} steps - The iteration steps.
   * @returns {RGB} Output an array of the base colour monochrome.
   */
  Greyscale(steps: number = 10) {
    return grayscale(this.colourHex);
  }

  /**
   * Access internal funtions
   */
  get _in_() {
    return {
      rgbToHex: function (code: RGB) {
        return rgbToHex(code);
      },
      hexToRGB: function (code: string | undefined) {
        return hexToRGB(code);
      },
      hexToDec: function (code: string | undefined) {
        return hexToDec(code);
      },
      rgbToHSL: function (rgb: RGB) {
        return rgbToHSL(rgb);
      },
      hslToRGB: function (hsl: HSL) {
        return hslToRGB(hsl);
      },
      sortByHue: function (array: Array<RGB | HSL>) {
        return sortByHue(array);
      },
      rgbToCMYK: function (rgb: RGB) {
        return rgbToCMYK(rgb);
      },
      cmykToRGB: function (cmyk: CMYK) {
        return cmykToRGB(cmyk);
      },
    };
  }
}

/**
 * Generates several palettes.
 */
export class ColourPalette {
  private colourCode: ColourInput | undefined;

  constructor(colourCode?: ColourInput) {
    if (typeof colourCode === "undefined" && this.colourCode === undefined) {
      this.colourCode = generateRandomColour();
    }
    if (typeof colourCode !== "undefined")
      this.colourCode = getColour(colourCode);
  }

  showColour() {
    return this.colourCode;
  }

  paletteAplha(offset: number = 0) {
    if (typeof this.colourCode !== "undefined")
      return buildPaletteAlpha(this.colourCode, true, offset);
    throw new Error("Invalid colour!");
  }

  paletteBeta(offset: number = 0) {
    if (typeof this.colourCode !== "undefined")
      return buildPaletteBeta(this.colourCode, offset);
    throw new Error("Invalid colour!");
  }

  paletteGamma(offset: number = 0) {
    if (typeof this.colourCode !== "undefined")
      return buildPaletteGamma(this.colourCode, offset);
    throw new Error("Invalid colour!");
  }

  paletteProAlpha() {
    if (typeof this.colourCode !== "undefined")
      return buildProPalette(this.colourCode);
    throw new Error("Invalid colour!");
  }

  paletteProBeta() {
    if (typeof this.colourCode !== "undefined")
      return buildProPaletteBeta(this.colourCode);
    throw new Error("Invalid colour!");
  }

  paletteProMix() {
    if (typeof this.colourCode !== "undefined")
      return buildProPaletteMix(this.colourCode);
    throw new Error("Invalid colour!");
  }
}

/**
 * Look up the name of the inputted colour.
 * @param colour: Get the colour input.
 * @param destruct: determine whether or not to return an object.
 * @returns Returns the name (or alternative name) of the inputted colour.
 * @example
 * ```js
 * ColourLookup("#1ca7ec") // Huelveño Horizon
 * Or
 * ColourLookup("#1ca7ec", true).name() // Huelveño Horizon
 * ```
 *
 */
export function ColourLookup(colour: ColourInput, destruct: boolean = false) {
  const lookup = colourLookup(colour);

  if (typeof lookup === "object") {
    const [name, alt, dist] = [lookup.name, lookup.alt, lookup.dist];
    if (!destruct) return name;

    return {
      name: () => {
        return name;
      },
      alt: () => {
        return alt;
      },
      dist: () => {
        return dist;
      },
    };
  }

  return lookup;
}

export default { ColourScheme, ColourPalette, ColourLookup };
