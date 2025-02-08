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

## Benchmark

```txt
$ deno bench
Check file:///COBOL.js/mod_bench.ts
    CPU | Apple M2
Runtime | Deno 2.1.9 (aarch64-apple-darwin)

file:///COBOL.js/mod_bench.ts

benchmark                  time/iter (avg)        iter/s      (min … max)           p75      p99     p995
-------------------------- ----------------------------- --------------------- --------------------------
Dynamic import                      1.2 µs       843,200 (  1.2 µs …   1.3 µs)   1.2 µs   1.3 µs   1.3 µs
SIGNED_NUMBER.parse                83.7 ns    11,950,000 ( 75.1 ns …  90.5 ns)  85.3 ns  88.5 ns  89.6 ns
SIGNED_NUMBER.toString             85.1 ns    11,750,000 ( 73.4 ns … 110.2 ns)  87.1 ns 101.8 ns 104.6 ns
UNSIGNED_NUMBER.parse               9.9 ns   100,800,000 (  8.4 ns …  18.3 ns)   9.7 ns  14.6 ns  14.8 ns
UNSIGNED_NUMBER.toString           38.5 ns    26,000,000 ( 34.4 ns …  48.2 ns)  41.4 ns  43.8 ns  44.3 ns
```
