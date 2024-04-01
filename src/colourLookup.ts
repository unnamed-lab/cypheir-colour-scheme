import colourNameList from "color-name-list" with { type: "json" };
import nearestColour from "nearest-color";
import { ColourInput  } from "./types";
import { getColour } from "./functions";
import { ColourLookup } from "./interfaces";

/**
 * Looks for the nearest colour from the unknown base colour.
 * @param {string} colour: Gets the HEX code input.
 * @returns Returns an object of the nearest colour to the inputted one. e.g {
  name: 'Radioactive Lilypad',
  value: '#66dd00',
  rgb: { r: 102, g: 221, b: 0 },
  distance: 7.615773105863909
}
 */
export function colourNearest(colour:string) {
    const colours = colourNameList?.reduce(
        (o: {name: string}, {name, hex}) => Object.assign(o, {[name]: hex}), {});

    const nearest = nearestColour.from(colours);
    return nearest(`#${colour}`)
}

/**
 * Look up the name of the inputted colour.
 * @param {string | RGB} colour: Gets the HEX code or RGB object input.
 * @param  {boolean} getNearest: To check whether or not the function is to find the nearest colour if base is unknown.
 * @returns Returns the name (or alternative name) of the inputted colour.
 */
export function colourLookup(colour: ColourInput, getNearest:boolean = true):string | ColourLookup {
  const hex = getColour(colour);

  // Converts the default {name: "", hex: ""} format to {name: hex}
  const colourSearch = colourNameList.find((el: { name: string; hex: string }) => el.hex === `#${hex}`);
  
  if (colourSearch !== undefined) return colourSearch?.name;
  if (getNearest && colourSearch === undefined) {
    return {
        name:`${colourNearest(hex)?.name}`, 
        alt: `${colourNearest(hex)?.value}`, 
        dist: (colourNearest(hex)?.distance).toFixed(4)
    };
}
  
  return "Not Found"
}
