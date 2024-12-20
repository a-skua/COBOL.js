# COBOL.js

Define Types of COBOL.

## Install

Published on [JSR](https://jsr.io/@askua/cobol).

```sh
# Deno
deno add jsr:@askua/cobol

# npm
npx jsr add @askua/cobol
```

## Usage

```ts
import { SIGNED_NUMBER, UNSIGNED_NUMBER } from "@askua/cobol";

const a = SIGNED_NUMBER.parse("0000000A").as(); // 1
const b = SIGNED_NUMBER.parse("0000010{").as(); // 100

console.log(SIGNED_NUMBER(a - b).toString(8)); // "0000009R"
console.log(UNSIGNED_NUMBER(a - b).toString(8)); // "00000099"
```
