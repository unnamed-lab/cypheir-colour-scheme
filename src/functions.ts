import { HSL, RGB } from "./interfaces";
import { ColourInput } from "./types";

/* 
ALGORITHM
- Get the colour input (In HEX or RGB format). [Done]
- Convert the colour into hexadecimals or decimals. [Done]
- Calculate angles in the colour wheel. [Done]
- Find colour schemes for:
    - Monochromatics [Done]
    - Complementary [Done]
    - Analogous [Done]
    - Tradic [Done]
    - Tetradic [Done]
- Output the results in an object
*/

/** 
  * @title: Get Colour Code Input.
  * @desc: To get the string or object(RGB) input from the user.
  * @param {ColourInput} colour: Gets either a HEX string input or a RGB object data type.
  * @returns {string}: Returns a HEX string.

*/
export function getColour(colour: ColourInput): string | never {
  let colourCode: string;
  if (typeof colour === "string") {
    let hexCode: string;
    if (colour[0] === "#") {
      hexCode = getDigitsHex(colour);
    } else {
      hexCode = getDigitsHex(colour, false);
    }
    colourCode = hexCode.toLowerCase();
  } else {
    const { red, green, blue } = colour;
    if (
      red > 255 ||
      red < 0 ||
      green > 255 ||
      green < 0 ||
      blue > 255 ||
      blue < 0
    ) {
      throw new Error("Invalid RGB value inputted.");
    }
    const hexCode: string = rgbToHex(colour);
    colourCode = hexCode.toLowerCase();
  }
  return colourCode;
}

/**
 * @title: Convert RGB to HEX.
 * @desc: To convert the inputted RGB object into hexadecimal.  Adding zeros to one digit RGB properties.
 * @param {RGB} code: Gets a RGB object {red: x, green: y, blue: z}.
 * @returns {string}: Returns a HEX string.
 */
export function rgbToHex(code: RGB): string {
  let { red, green, blue } = code;
  const redHex = red.toString(16);
  const greenHex = green.toString(16);
  const blueHex = blue.toString(16);
  return `${redHex.length === 1 ? "0" + redHex : redHex}${
    greenHex.length === 1 ? "0" + greenHex : greenHex
  }${blueHex.length === 1 ? "0" + blueHex : blueHex}`;
}

/**
 * @title: Convert RGB to HEX.
 * @desc: To convert the inputted RGB object into hexadecimal. Adding zeros to one digit RGB properties.
 * @param {string} code: Gets a HEX string.
 * @returns {RGB}: Returns a RGB object {red: x, green: y, blue: z}.
 */
export function hexToRGB(code: string | undefined): RGB | never {
  if (typeof code === "undefined") {
    throw new Error("Invalid code");
  }
  const red = parseInt(code.slice(0, 2), 16);
  const green = parseInt(code.slice(2, 4), 16);
  const blue = parseInt(code.slice(4, 6), 16);
  const output: RGB = { red, green, blue };

  return output;
}

/*
  @title: Clean HEX string input.
  @desc: To remove hashtags from user HEX inputs.
*/
function getDigitsHex(code: string, hasTag: boolean = true): string | never {
  let codeHex: string;
  let outHex: string;
  if (hasTag) {
    const noTag = code.slice(1);
    codeHex = noTag;
  } else {
    codeHex = code;
  }

  if (codeHex.length === 3) {
    const rgbHex =
      codeHex[0] +
      codeHex[0] +
      codeHex[1] +
      codeHex[1] +
      codeHex[2] +
      codeHex[2];
    return (outHex = rgbHex);
  } else if (codeHex.length > 3 && codeHex.length < 6) {
    throw new Error("Invalid colour hex format");
  } else if (codeHex.length === 6) {
    return (outHex = codeHex);
  } else {
    throw new Error("Invalid colour hex format");
  }
}

/*
  @title: Converts hexadecimals to decimal values.
  @desc: Converts the hexadecimal inputs into decimal values.
*/
export function hexToDec(code: string | undefined): never | number {
  if (typeof code === "string") {
    let hexCode: string;
    if (code[0] === "#") {
      hexCode = getDigitsHex(code);
    } else {
      hexCode = getDigitsHex(code, false);
    }
    const decVal = parseInt(hexCode, 16); // Convert hexadecimal to decimal
    return decVal;
  }
  throw new Error("Invalid code");
}

/** 
  @title: Converts decimal inputs to hexadecimal values.
  @desc: Converts the decimal inputs into hexadecimal values.
*/
export function decToHex(value: number): string {
  return value.toString(16);
}

/**
  @title: Evaluate the inputted angle.
  @desc: Handles the angle input, converting overflow back into the 360deg range.
*/
function angleReading(angle: number): number {
  const CIRCLE: 360 = 360;
  const rad = angle % CIRCLE;
  const output = rad / CIRCLE;
  return output;
}

/**
  @title: Generates colour equivalent based on angle.
  @desc: Mathematically solve for the equivalent colour of the inputted HEX.
*/
export function colourEquivAngle(hexCode: string, angle: number): string {
  const MAXHEX: 16777215 = 16777215;
  if (typeof hexCode === "undefined") {
    throw new Error("Undefined colour format");
  }
  const inputCode: number = hexToDec(hexCode);

  const hexNum = parseInt(
    ((angleReading(angle) * MAXHEX + inputCode) % MAXHEX).toFixed(0)
  );

  return decToHex(hexNum);
}

/**
 * Converts RGB object to HSL.
 * @param {RGB} rgb - The RGB object {red: x, green: y, blue: z}.
 * @returns {HSL} Outputs a HSL object.
 */
export function rgbToHSL(rgb: RGB): HSL {
  const valMAX: 255 = 255;
  let { red, green, blue } = rgb;
  red = red / valMAX;
  green = green / valMAX;
  blue = blue / valMAX;

  // Get the max and min values
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);

  // Lightness
  const l = (max + min) / 2;

  // Hue and Saturation
  let h: number, s: number;

  if (max === min) {
    h = s = 0; //  Achromatic
  } else {
    const d = max - min;

    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case red:
        h = (green - blue) / d + (green < blue ? 6 : 0) * 60;
        break;
      case green:
        h = ((blue - red) / d + 2) * 60;
        break;
      case blue:
        h = ((red - green) / d + 4) * 60;
        break;
    }
  }

  return { hue: h, saturation: s, lightness: l };
}

/**
 * Converts HSL object to RGB.
 * @param {HSL} hsl - THe HSL object {hue: x, saturation: y, lightness: z}
 * @returns {RGB} Outputs a RGB object.
 */
export function hslToRGB(hsl: HSL): RGB {
  const { hue, saturation, lightness } = hsl;
  const [h, s, l] = [hue, saturation, lightness];

  let r, g, b;

  if (s === 0) {
    r = g = b = l; // Achromatic
  } else {
    const mHueToRGB = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = mHueToRGB(p, q, h / 360 + 1 / 3);

    g = mHueToRGB(p, q, h / 360);
    b = mHueToRGB(p, q, h / 360 - 1 / 3);
  }

  const output: RGB = {
    red: Math.round(r * 255),
    green: Math.round(g * 255),
    blue: Math.round(b * 255),
  };
  return output;
}

/*
  MONOCHROME SCHEME BLUEPRINT

  Algortihm:
  - Search through the RGB Object and identify the property with the highest value.
  - Make the highest value be the maximum value(X).
  - increment other values by every 10%
  - Max value of incrementation must equal to maximum value(X)

*/

///////////////////////////////////////////////

/**
 * Generates an array of the monochromatics of the base colour.
 * @param {string} code - The HEX code of the base colour.
 * @param {number} steps - The iteration steps.
 * @returns {RGB} Output an array of the base colour monochrome.
 */
export function monochrome(
  code: string | undefined,
  steps: number = 10
): Array<RGB> {
  const RGB: RGB = hexToRGB(code);
  const rgbObj = Object.entries(RGB);
  let MAX = { name: "", value: 0 };
  rgbObj.forEach(([key, value]) => {
    if (MAX.value < value) {
      MAX.name = key;
      MAX.value = value;
    }
  });

  const objSet = new Set<RGB>();

  for (let i = 10; i >= 1; i--) {
    const pIncrement = Math.ceil((((10 - i) * steps) / 100) * MAX.value);
    let obj: RGB = { red: 0, green: 0, blue: 0 };

    rgbObj.forEach(([key, value]) => {
      if (MAX.name === key) {
        Object.defineProperty(obj, key, { value });
      } else {
        if (i === 1 || value + pIncrement > MAX.value) {
          Object.defineProperty(obj, key, { value: MAX.value });
        } else if (i > 1) {
          Object.defineProperty(obj, key, { value: value + pIncrement });
        }
      }
    });
    objSet.add(obj);
  }
  const arr: Array<RGB> = [...objSet];
  return arr;
}

/*
  COMPLIMENTARY SCHEME BLUEPRINT

  Algortihm:
  - Convert the colour to HSL
  - Add 180 deg to the hue
  - Convert it to RGB

*/

///////////////////////////////////////////////

/**
 * Finds the complimentary colours of the input colour.
 * @param {RGB} colour - Get the RGB colour.
 * @param {number | Array<number>} variation - 1 = 180deg, 2 = [150deg, 210deg], [number] = [90, 120, 270].
 * @param {boolean} toHex - to convert the output to HEX.
 * @returns {RGB | Array<number>} The RGB values of the complimentary colours.
 */
export function complimentary(
  colour: RGB,
  variation: 1 | 2 | Array<number> = 1,
  toHex: boolean = true
): RGB | string | Array<RGB | string> {
  const hsl = rgbToHSL(colour);
  let complimentHue;
  let angle;

  if (variation === 1) {
    angle = 180;
    complimentHue = (hsl.hue + angle) % 360;

    return toHex
      ? rgbToHex(
          hslToRGB({
            hue: complimentHue,
            saturation: hsl.saturation,
            lightness: hsl.lightness,
          })
        )
      : hslToRGB({
          hue: complimentHue,
          saturation: hsl.saturation,
          lightness: hsl.lightness,
        });
  } else if (variation === 2) {
    angle = [150, 210];
    const output: Array<RGB | string> = angle.map((el) => {
      const complimentArrHue = (hsl.hue + el) % 360;
      return toHex
        ? rgbToHex(
            hslToRGB({
              hue: complimentArrHue,
              saturation: hsl.saturation,
              lightness: hsl.lightness,
            })
          )
        : hslToRGB({
            hue: complimentArrHue,
            saturation: hsl.saturation,
            lightness: hsl.lightness,
          });
    });
    return output;
  } else {
    const angle: Array<number> = variation;
    const output: Array<RGB | string> = angle.map((el) => {
      const complimentArrHue = (hsl.hue + el) % 360;
      return toHex
        ? rgbToHex(
            hslToRGB({
              hue: complimentArrHue,
              saturation: hsl.saturation,
              lightness: hsl.lightness,
            })
          )
        : hslToRGB({
            hue: complimentArrHue,
            saturation: hsl.saturation,
            lightness: hsl.lightness,
          });
    });
    return output;
  }
}

/*
  ANALOGUE SCHEME BLUEPRINT

  Algortihm:
  - Convert the colour to HSL
  - Gets colour adjacent to the base colour
  - Convert it to RGB

*/

///////////////////////////////////////////////

/**
 * Gets the Analogous colour scheme.
 * @param {RGB} colour: Takes a RGB object {red: x, green: y, blue: z}.
 * @param {number} offset : Takes a number ranging from 0 to 90 to create an offset in the colour schem adjacent angle.
 * @returns Return a RGB object {red: x, green: y, blue: z}.
 */
export function analogous(colour: RGB, offset: number = 0): RGB {
  const hsl = rgbToHSL(colour);
  const h = hsl.hue;
  const limOffset = Math.min(Math.max(offset, 0), 90);

  let adjacent = (180 - (h + limOffset) + 360) % 360;

  const adjHSL: HSL = {
    hue: adjacent,
    saturation: hsl.saturation,
    lightness: hsl.lightness,
  };

  return hslToRGB(adjHSL);
}

/*
  TRIADIC SCHEME BLUEPRINT

  Algortihm:
  - Convert the colour to HSL
  - Gets 120deg and 240deg colour from the base colour
  - Convert it to RGB

*/

///////////////////////////////////////////////

/**
 * Get the Triadic value of the base colour.
 * @param {RGB} colour: Get the RGB colour
 * @param {number | [number, number]} offset: Set offeset between the two triadic angled colours.
 * @param {boolean} toHex: to convert the output to HEX.
 * @returns Returns a string or RGB object array of the triadic colours.
 */
export function triadic(
  colour: RGB,
  offset: number | [number, number] = 0,
  toHex: boolean = true
) {
  const hsl = rgbToHSL(colour);
  const angle = [120, 240];

  if (typeof offset === "number") {
    const output: Array<RGB | string> = angle.map((el, index) => {
      const cHue = (hsl.hue + (el + offset)) % 360;
      const nHSL = hslToRGB({
        hue: cHue,
        saturation: hsl.saturation,
        lightness: hsl.lightness,
      });

      return toHex ? rgbToHex(nHSL) : nHSL;
    });
    return output;
  } else {
    const output: Array<RGB | string> = angle.map((el, index) => {
      const sign = index === 0 ? offset[0] : offset[1];
      const cHue = (hsl.hue + (el + sign)) % 360;
      const nHSL = hslToRGB({
        hue: cHue,
        saturation: hsl.saturation,
        lightness: hsl.lightness,
      });

      return toHex ? rgbToHex(nHSL) : nHSL;
    });
    return output;
  }
}


/*
  TETRADIC SCHEME BLUEPRINT

  Algortihm:
  - Convert the colour to HSL
  - Gets 60deg, 180deg and 240deg colour from the base colour
  - Convert it to RGB

*/

///////////////////////////////////////////////

/**
 * Get the Tetradic value of the base colour.
 * @param {RGB} colour: Get the RGB colour
 * @param {number} offset: Set offeset between the two triadic angled colours.
 * @param {boolean} toHex: to convert the output to HEX.
 * @returns Returns a string or RGB object array of the triadic colours.
 */
export function tetradic(
  colour: RGB,
  offset: number  = 0,
  toHex: boolean = true
) {
  const hsl = rgbToHSL(colour);
  const angle = [60, 180, 240];

  const output: Array<RGB | string> = angle.map((el, index) => {
    const cHue = (hsl.hue + (el + offset)) % 360;
    const nHSL = hslToRGB({
      hue: cHue,
      saturation: hsl.saturation,
      lightness: hsl.lightness,
    });

    return toHex ? rgbToHex(nHSL) : nHSL;
  });
  return output;
}
