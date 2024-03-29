import {
  analogous,
  colourEquivAngle,
  complimentary,
  getColour,
  hexToRGB,
  monochrome,
  rgbToHex,
  rgbToHSL,
} from "./functions";
import { RGB } from "./interfaces";
import { ColourInput } from "./types";

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
  getMonochrome(): Array<string> {
    const monoArr: Array<RGB> = monochrome(this.colourHex);

    const hexArr = monoArr.map((el: RGB): string => {
      return rgbToHex(el);
    });
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
  getCompliments(variation: 1 | 2 | Array<number>, toHex: boolean = true) {
    return complimentary(hexToRGB(this.colourHex), variation, toHex);
  }

  /**
   * Gets the Analogous colour scheme of the base colour.
   * @param {number} offset : Set an offset degree.
   * @returns Return a RGB object {red: x, green: y, blue: z}.
   */
  getAnalogous(offset: number = 0) {
    return analogous(hexToRGB(this.colourHex), offset);
  }
}
