### Developer Setup

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
    /* Visit https://aka.ms/tsconfig to read more about this file */

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
