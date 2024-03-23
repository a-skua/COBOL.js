# COBOL.js

Define Types of COBOL.

## Usage

```ts
import { SIGNED_NUMBER } from "./mod.ts";

const num = SIGNED_NUMBER.parse("000000010{"); // 100
const str = SIGNED_NUMBER.toString(num, 10); // "000000010{"
```
