# Cypheir Colour Scheme Generator

![Cypheir Logo](https://pbs.twimg.com/profile_banners/1508639582253891588/1648547415/1500x500)

## Description

The **Cypheir Colour Scheme** is a meticulously crafted colour palette designed for use in projects involving colour mixing, coombination and psychology.

Consider the psychological impact of each colour. How does it make people feel? Use this knowledge strategically in branding, user interfaces, and visual communication.

The Cypheir colour schemes should evoke inspiration and creativity. They should ignite the imagination and encourage innovative design choices.

## Installation

```bash
npm install cypheir-color-scheme
```

## Usage

```javascript
const { ColourScheme } = require("cypheir-color-scheme");

// Example usage
const color = new ColourScheme("#009cff");
console.log(color.Monochrome());
```

## Features

- HSL to RGB Converter
- RGB to HSL Converter
- HEX to RGB Converter
- RGB to HEX Converter
- Monochrome Generator
- Complimentary Colour Scheme
- Analogous Colour Scheme
- Tradic Colour Scheme
- Tetradic Colour Scheme

## API Reference

```typescript
Monochrome() :Array<string>
```

A callback function that uses the base colour to run a loop to get the relative monochromatic colours.

Returns an array of string.

```typescript
Compliments(variation: number | Array<number>, toHex: boolean) :string | RGB | (string | RGB)[]
```

_Parameters:_

- `variation`: Set the different variants of output: 1 = 180deg, 2 = [150deg, 210deg], [90, 120, 270] = [90deg, 120deg, 270deg].
- `toHex`: Converts the output to HEX code (default: true)

Returns a string or a RGB object or an array of strings or RGB objects.

```typescript
Analogous(offset: number) :RGB
```

_Parameters:_

- `offset`: Set an offset degree.

Return a RGB object {red: x, green: y, blue: z}.

```typescript
Tradic(offset: number | [number, number], toHex: boolean)
```

_Parameters:_

- `offset`: Set offeset between the two triadic angled colours.
- `toHex`: To convert the output to HEX.

Returns a string or RGB object array of the triadic colours.

```typescript
Tetradic(offset: number , toHex: boolean)
```

_Parameters:_

- `offset`: Set offeset between the two tetradic angled colours.
- `toHex`: To convert the output to HEX.

Returns a string or RGB object array of the tetradic colours.

## Contributing

Contributions are welcome! If you'd like to improve the color scheme or add support for additional languages, feel free to submit a pull request.

## License

This project is licensed under the [MIT License](https://github.com/unnamed-lab/cypheir-colour-scheme/blob/main/LICENSE).

## Developer Setup

**tsup.config.ts**

```

import { defineConfig } from "tsup";

export default defineConfig({
format: ["cjs", "esm"],
entry: ["./src/index.ts"],
dts: true,
shims: true,
skipNodeModulesBundle: true,
clean: true,
});

```

**tsconfig.json**

```

{
"compilerOptions": {
/_ Visit https://aka.ms/tsconfig to read more about this file _/

    /* Language and Environment */
    "target": "ES2022" /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */,
    // "lib": [],

    /* Modules */
    "module": "CommonJS" /* Specify what module code is generated. */,
    "rootDir": "./" /* Specify the root folder within your source files. */,
    "moduleResolution": "Node10" /* Specify how TypeScript looks up a file from a given module specifier. */,


    /* Emit */
    "declaration": true /* Generate .d.ts files from TypeScript and JavaScript files in your project. */,
    "sourceMap": true /* Create source map files for emitted JavaScript files. */,
    "outDir": "./dist" /* Specify an output folder for all emitted files. */,
    "noEmit": true /* Disable emitting files from a compilation. */,

    /* Interop Constraints */
    "isolatedModules": true /* Ensure that each file can be safely transpiled without relying on other imports. */,
    "esModuleInterop": true /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */,
    "forceConsistentCasingInFileNames": true /* Ensure that casing is correct in imports. */,

    /* Type Checking */
    "strict": true /* Enable all strict type-checking options. */,
    "noImplicitAny": true /* Enable error reporting for expressions and declarations with an implied 'any' type. */,
    "strictNullChecks": true /* When type checking, take into account 'null' and 'undefined'. */,

},
"include": ["src"],
"exclude": ["node_modules"]
}

```

```

```
