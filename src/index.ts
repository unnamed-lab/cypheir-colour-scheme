import {
  analogous,
  colourEquivAngle,
  complimentary,
  getColour,
  hexToRGB,
  hslToRGB,
  monochrome,
  rgbToHex,
  rgbToHSL,
} from "./functions";
import { RGB } from "./interfaces";
import { ColourInput } from "./types";

export class ColourScheme {
  colourCode: ColourInput;
  colourHex: string | undefined; // get the procssed hex value

  constructor(colourCode: ColourInput) {
    this.colourCode = colourCode;
    this.colourHex = getColour(this.colourCode);
  }

  getColour(): string | undefined {
    return this.colourHex;
  }

  getEquivHex(angle: number) {
    if (typeof this.colourHex === "string") {
      return colourEquivAngle(this.colourHex, angle);
    }
    throw new Error("Undefined colour format");
  }

  getRGB() {
    return hexToRGB(this.colourHex);
  }

  getMonochrome(): Array<string> {
    const monoArr: Array<RGB> = monochrome(this.colourHex);

    const hexArr = monoArr.map((el: RGB): string => {
      return rgbToHex(el);
    });
    return hexArr.filter((el, index) => {
      return index === 0 || el !== hexArr[index - 1];
    });
  }

  getHSL() {
    return rgbToHSL(hexToRGB(this.colourHex));
  }

  convertHSLToRGB() {
    return hslToRGB(rgbToHSL(hexToRGB(this.colourHex)));
  }

  getCompliments(variation: 1 | 2 | Array<number>, toHex: boolean = true) {
    return complimentary(hexToRGB(this.colourHex), variation, toHex);
  }

  getAnalogous(offset: number = 0) {
    return analogous(hexToRGB(this.colourHex), offset);
  }
}
