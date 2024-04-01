import { ColourScheme, ColourPalette, ColourLookup } from "../dist/index.mjs";


// const color = new ColourScheme("#a759c2");
// const color = new ColourScheme("#000cff");
// const color = new ColourScheme("#3fe22e");

// console.log(color.getColour());
// console.log(color._in_.hexToRGB("000cff"));
// console.log(color._in_.rgbToHSL({ red: 248, green: 222, blue: 160 }));
// console.log(color._in_.rgbToHSL({ red: 0, green: 12, blue: 255 }));
// console.log(color.getRGB());
// console.log(color._in_.hexToDec("fd2346"));
// console.log(color.Monochrome());
// console.log(color.Greyscale());

// const palette = new ColourPalette();
// console.log(palette.showColour());
// console.log(palette.paletteAplha());
// console.log(palette.paletteBeta());
// console.log(palette.paletteGamma());
// console.log(palette.paletteProAlpha());
// console.log(palette.paletteProBeta());
// console.log(palette.paletteProMix());

const colourSearch = ColourLookup("#1ca7ec", true);
console.log(colourSearch.name())
// console.log(colourSearch.name());