export interface RGB {
  red: number;
  green: number;
  blue: number;
  alpha?: number;
}

export interface HSL {
  hue: number;
  saturation: number;
  lightness: number;
}

export interface CMYK {
  c: number;
  m: number;
  y: number;
  k: number;
}

export interface ColourLookup {
  name: string;
  alt: string;
  dist: number;
}
