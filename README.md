# COBOL.js

Define Types of COBOL.

## Usage

```ts
import { SIGNED_NUMBER } from "./mod.ts";

const a = SIGNED_NUMBER.parse("000000010{").as(); // 100
const b = 1;

console.log(SIGNED_NUMBER(a + b).toString(10)); // "000000010A"
```
