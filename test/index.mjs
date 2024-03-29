import { ColourScheme } from "../dist/index.mjs";

const color = new ColourScheme("ff0000");

// console.log(color.getColour());
console.log(color.getRGB());
// console.log(color.getHSL());
// console.log(color.convertHSLToRGB());
// console.log(color.getCompliments([60, 90, 120, 270], false));
// console.log(color.getAnalogous());
console.log(color.getTradic(0, false));
