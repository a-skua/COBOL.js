/**
 * _SINED_CHARS
 *
 * +0: "{"
 * +1: "A"
 * +2: "B"
 * +3: "C"
 * +4: "D"
 * +5: "E"
 * +6: "F"
 * +7: "G"
 * +8: "H"
 * +9: "I"
 * -0: "}"
 * -1: "J"
 * -2: "K"
 * -3: "L"
 * -4: "M"
 * -5: "N"
 * -6: "O"
 * -7: "P"
 * -8: "Q"
 * -9: "R"
 */
const _SIGNED_CHARS = [
  ["0", "0"],
  ["1", "1"],
  ["2", "2"],
  ["3", "3"],
  ["4", "4"],
  ["5", "5"],
  ["6", "6"],
  ["7", "7"],
  ["8", "8"],
  ["9", "9"],
  ["+0", "{"],
  ["+1", "A"],
  ["+2", "B"],
  ["+3", "C"],
  ["+4", "D"],
  ["+5", "E"],
  ["+6", "F"],
  ["+7", "G"],
  ["+8", "H"],
  ["+9", "I"],
  ["-0", "}"],
  ["-1", "J"],
  ["-2", "K"],
  ["-3", "L"],
  ["-4", "M"],
  ["-5", "N"],
  ["-6", "O"],
  ["-7", "P"],
  ["-8", "Q"],
  ["-9", "R"],
] as const;

const d2c = Object.fromEntries(_SIGNED_CHARS) as {
  [T in typeof _SIGNED_CHARS[number] as T[0]]: T[1];
};
const c2d = Object.fromEntries(_SIGNED_CHARS.map(([d, c]) => [c, d])) as {
  [T in typeof _SIGNED_CHARS[number] as T[1]]: T[0];
};

const _signed_number = Symbol("signed_number");
const _unsigned_number = Symbol("unsigned_number");

/**
 * SIGNED_DIGIT_OBJECT
 *
 * ### Example
 *
 * ```ignore
 * import { assertEquals } from "@std/assert";
 *
 * const a = SIGNED_DIGIT("+1").toChar();
 * assertEquals(a, "A");
 *
 * const neg = SIGNED_DIGIT("-1").isNegative();
 * assertEquals(neg, true);
 *
 * const num = SIGNED_DIGIT("+1").toNumber();
 * assertEquals(num, 1);
 *
 * const obj = SIGNED_DIGIT("+1");
 * assertEquals(`${obj}`, "+1");
 * ```
 */
interface SIGNED_DIGIT_OBJECT {
  /**
   * SIGNED_DIGIT to SIGNED_CHAR
   *
   * ### Example
   *
   * ```ignore
   * import { assertEquals } from "@std/assert";
   *
   * const a = SIGNED_DIGIT("+1").toChar();
   * assertEquals(a, "A");
   * ```
   */
  toChar(): SIGNED_CHAR;

  /**
   * SIGNED_DIGIT is negative
   *
   * ### Example
   *
   * ```ignore
   * import { assertEquals } from "@std/assert";
   *
   * const neg = SIGNED_DIGIT("-1").isNegative();
   * assertEquals(neg, true);
   *
   * const pos = SIGNED_DIGIT("+1").isNegative();
   * assertEquals(pos, false);
   */
  isNegative(): boolean;

  /**
   * SIGNED_DIGIT to number
   *
   * ### Example
   *
   * ```ignore
   * import { assertEquals } from "@std/assert";
   *
   * const num = SIGNED_DIGIT("+1").toNumber();
   * assertEquals(num, 1);
   * ```
   */
  toNumber(): number;

  /**
   * SIGNED_DIGIT to string
   *
   * ### Example
   *
   * ```ignore
   * import { assertEquals } from "@std/assert";
   *
   * const obj = SIGNED_DIGIT("+1");
   * assertEquals(`${obj}`, "+1");
   * ```
   */
  toString(): string;
}

/**
 * SIGNED_DIGIT_STATIC
 *
 * ### Example
 *
 * ```ignore
 * import { assertEquals } from "@std/assert";
 *
 * const obj = SIGNED_DIGIT.parse(1234);
 * assertEquals(`${obj}`, "+4");
 *
 * const char = obj.toChar();
 * assertEquals(char, "D");
 * ```
 */
interface SIGNED_DIGIT_STATIC {
  /**
   * Parse number to SIGNED_DIGIT
   *
   * ### Example
   *
   * ```ignore
   * import { assertEquals } from "@std/assert";
   *
   * const obj = SIGNED_DIGIT.parse(1234);
   * assertEquals(`${obj}`, "+4");
   * ```
   */
  parse(n: number): SIGNED_DIGIT_OBJECT;
}

/**
 * SIGNED_DIGIT: +0, +1, ..., +9, -0, -1, ..., -9
 */
type SIGNED_DIGIT = typeof _SIGNED_CHARS[number][0];
const SIGNED_DIGIT:
  & ((digit: SIGNED_DIGIT) => SIGNED_DIGIT_OBJECT)
  & SIGNED_DIGIT_STATIC = Object.assign(
    (digit: SIGNED_DIGIT) => ({
      toChar(): SIGNED_CHAR {
        return d2c[digit];
      },
      isNegative(): boolean {
        return digit.startsWith("-");
      },
      toNumber(): number {
        return Number(digit);
      },
      toString(): string {
        return digit;
      },
    }),
    {
      parse(n: number): SIGNED_DIGIT_OBJECT {
        const digit =
          ((n < 0 ? "-" : "+") + (Math.abs(n) % 10)) as SIGNED_DIGIT;
        return SIGNED_DIGIT(digit);
      },
    },
  );

/**
 * SIGNED_CHAR_OBJECT
 *
 * ### Example
 *
 * ```ignore
 * import { assertEquals } from "@std/assert";
 *
 * const a = SIGNED_CHAR("A").toDigit();
 * assertEquals(a, "+1");
 *
 * const obj = SIGNED_CHAR("A");
 * assertEquals(`${obj}`, "A");
 * ```
 */
interface SIGNED_CHAR_OBJECT {
  /**
   * SIGNED_CHAR to SIGNED_DIGIT
   *
   * ### Example
   *
   * ```ignore
   * import { assertEquals } from "@std/assert";
   *
   * const a = SIGNED_CHAR("A").toDigit();
   * assertEquals(a, "+1");
   * ```
   */
  toDigit(): SIGNED_DIGIT;

  /**
   * SIGNED_CHAR to string
   *
   * ### Example
   *
   * ```ignore
   * import { assertEquals } from "@std/assert";
   *
   * const obj = SIGNED_CHAR("A");
   * assertEquals(`${obj}`, "A");
   * ```
   */
  toString(): string;
}

/**
 * SIGNED_CHAR_STATIC
 *
 * ### Example
 *
 * ```ignore
 * import { assertEquals } from "@std/assert";
 *
 * const obj = SIGNED_CHAR.parse("000A");
 * assertEquals(`${obj}`, "A");
 *
 * const digit = obj.toDigit();
 * assertEquals(digit, "+1");
 * ```
 */
interface SIGNED_CHAR_STATIC {
  /**
   * Parse string to SIGNED_CHAR
   *
   * ### Example
   *
   * ```ignore
   * import { assertEquals } from "@std/assert";
   *
   * const obj = SIGNED_CHAR.parse("000A");
   * assertEquals(`${obj}`, "A");
   * ```
   */
  parse(str: string): SIGNED_CHAR_OBJECT;
}

/**
 * SIGNED_CHAR: "{", "A", ..., "I", "}", "J", ..., "R"
 */
type SIGNED_CHAR = typeof _SIGNED_CHARS[number][1];
const SIGNED_CHAR:
  & ((c: SIGNED_CHAR) => SIGNED_CHAR_OBJECT)
  & SIGNED_CHAR_STATIC = Object.assign(
    (c: SIGNED_CHAR) => ({
      toDigit(): SIGNED_DIGIT {
        return c2d[c];
      },
      toString(): string {
        return c;
      },
    }),
    {
      parse(str: string): SIGNED_CHAR_OBJECT {
        const c = str.slice(-1);
        if (c in c2d) {
          return SIGNED_CHAR(c as SIGNED_CHAR);
        }
        return SIGNED_CHAR("0");
      },
    },
  );

/**
 * SIGNED_NUMBER_OBJECT
 */
export interface SIGNED_NUMBER_OBJECT {
  /**
   * as SIGNED_NUMBER
   *
   * ### Example
   *
   * ```ts
   * import { assertEquals } from "@std/assert";
   *
   * const a = SIGNED_NUMBER(1).as();
   * assertEquals(a, 1 as SIGNED_NUMBER);
   * ```
   */
  as(): SIGNED_NUMBER;

  /**
   * to String
   *
   * ### Example
   *
   * ```ts
   * import { assertEquals } from "@std/assert";
   *
   * const str = SIGNED_NUMBER(10).toString(8);
   * assertEquals(str, "0000001{");
   * ```
   */
  toString(length?: number): string;
}

/**
 * SIGNED_NUMBER_STATIC
 */
export interface SIGNED_NUMBER_STATIC {
  /**
   * parse String
   *
   * ### Example
   *
   * ```ts
   * import { assertEquals } from "@std/assert";
   *
   * const a = SIGNED_NUMBER.parse("00001{").as();
   * assertEquals(a, 10 as SIGNED_NUMBER);
   * ```
   */
  parse(str: string): SIGNED_NUMBER_OBJECT;

  /**
   * to String
   *
   * ### Example
   *
   * ```ts
   * import { assertEquals } from "@std/assert";
   *
   * const str = SIGNED_NUMBER.toString(10, 8);
   * assertEquals(str, "0000001{");
   * ```
   */
  toString(n: number, length?: number): string;

  /**
   * as SIGNED_NUMBER
   *
   * ### Example
   *
   * ```ts
   * import { assertEquals } from "@std/assert";
   *
   * const a = SIGNED_NUMBER.as(1);
   * assertEquals(a, 1 as SIGNED_NUMBER);
   * ```
   */
  as(n: number): SIGNED_NUMBER;
}

/**
 * SIGNED_NUMBER (Branded type)
 *
 * S9(4), S9999, etc.
 *
 * ### Example
 *
 * ```ts
 * import { assertEquals } from "@std/assert";
 *
 * const a = SIGNED_NUMBER(1).as();
 * assertEquals(a, 1 as SIGNED_NUMBER);
 *
 * const b = SIGNED_NUMBER.parse("00001{").as();
 * assertEquals(b, 10 as SIGNED_NUMBER);
 *
 * const str = SIGNED_NUMBER(a + b).toString(8);
 * assertEquals(str, "0000001A");
 * ```
 */
export type SIGNED_NUMBER = number & { [_signed_number]: never };
export const SIGNED_NUMBER:
  & ((n?: number) => SIGNED_NUMBER_OBJECT)
  & SIGNED_NUMBER_STATIC = Object.assign(
    (n: number = 0) => ({
      as(): SIGNED_NUMBER {
        return n as SIGNED_NUMBER;
      },
      toString(length = 0): string {
        const c = SIGNED_DIGIT.parse(n).toChar();
        return (n > -10 && n < 10
          ? c
          : Math.floor(Math.abs(n) / 10).toString() + c)
          .padStart(length, "0");
      },
    }),
    {
      parse(str: string): SIGNED_NUMBER_OBJECT {
        const trancate = Number(str.slice(0, -1)) * 10;
        const digit = SIGNED_DIGIT(SIGNED_CHAR.parse(str).toDigit());
        return SIGNED_NUMBER(
          (trancate + Math.abs(digit.toNumber())) *
            (digit.isNegative() ? -1 : 1),
        );
      },
      toString(n: number, length = 0): string {
        return SIGNED_NUMBER(n).toString(length);
      },
      as(n: number): SIGNED_NUMBER {
        return SIGNED_NUMBER(n).as();
      },
    },
  );

/**
 * UNSIGNED_NUMBER_OBJECT
 */
export interface UNSIGNED_NUMBER_OBJECT {
  /**
   * as UNSIGNED_NUMBER
   *
   * ### Example
   *
   * ```ts
   * import { assertEquals } from "@std/assert";
   *
   * const a = UNSIGNED_NUMBER(10).as();
   * assertEquals(a, 10 as UNSIGNED_NUMBER);
   * ```
   */
  as(): UNSIGNED_NUMBER;

  /**
   * to String
   *
   * ### Example
   *
   * ```ts
   * import { assertEquals } from "@std/assert";
   *
   * const str = UNSIGNED_NUMBER(10).toString(8);
   * assertEquals(str, "00000010");
   * ```
   */
  toString(length?: number): string;
}

/**
 * UNSIGNED_NUMBER_STATIC
 */
export interface UNSIGNED_NUMBER_STATIC {
  /**
   * parse String
   *
   * ### Example
   *
   * ```ts
   * import { assertEquals } from "@std/assert";
   *
   * const a = UNSIGNED_NUMBER.parse("00000010").as();
   * assertEquals(a, 10 as UNSIGNED_NUMBER);
   * ```
   */
  parse(str: string): UNSIGNED_NUMBER_OBJECT;

  /**
   * to String
   *
   * ### Example
   *
   * ```ts
   * import { assertEquals } from "@std/assert";
   *
   * const str = UNSIGNED_NUMBER.toString(10, 8);
   * assertEquals(str, "00000010");
   * ```
   */
  toString(n: number, length?: number): string;

  /**
   * as UNSIGNED_NUMBER
   *
   * ### Example
   *
   * ```ts
   * import { assertEquals } from "@std/assert";
   *
   * const a = UNSIGNED_NUMBER.as(10);
   * assertEquals(a, 10 as UNSIGNED_NUMBER);
   * ```
   */
  as(n: number): UNSIGNED_NUMBER;
}

/**
 * UNSIGNED_NUMBER (Branded type)
 *
 * 9(4), 9999, etc.
 *
 * ### Example
 *
 * ```ts
 * import { assertEquals } from "@std/assert";
 *
 * const a = UNSIGNED_NUMBER(1).as();
 * assertEquals(a, 1 as UNSIGNED_NUMBER);
 *
 * const b = UNSIGNED_NUMBER.parse("00000010").as();
 * assertEquals(b, 10 as UNSIGNED_NUMBER);
 *
 * const str = UNSIGNED_NUMBER(a + b).toString(8);
 * assertEquals(str, "00000011");
 */
export type UNSIGNED_NUMBER = number & { [_unsigned_number]: never };
export const UNSIGNED_NUMBER:
  & ((n?: number) => UNSIGNED_NUMBER_OBJECT)
  & UNSIGNED_NUMBER_STATIC = Object.assign(
    (n: number = 0) => ({
      as(): UNSIGNED_NUMBER {
        return n as UNSIGNED_NUMBER;
      },
      toString(length = 0): string {
        return Math.abs(n).toString().padStart(length, "0");
      },
    }),
    {
      parse(str: string): UNSIGNED_NUMBER_OBJECT {
        return UNSIGNED_NUMBER(Number(str));
      },
      toString(n: number, length = 0): string {
        return UNSIGNED_NUMBER(n).toString(length);
      },
      as(n: number): UNSIGNED_NUMBER {
        return UNSIGNED_NUMBER(n).as();
      },
    },
  );
