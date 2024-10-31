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
  { d: "0", c: "0" },
  { d: "1", c: "1" },
  { d: "2", c: "2" },
  { d: "3", c: "3" },
  { d: "4", c: "4" },
  { d: "5", c: "5" },
  { d: "6", c: "6" },
  { d: "7", c: "7" },
  { d: "8", c: "8" },
  { d: "9", c: "9" },
  { d: "+0", c: "{" },
  { d: "+1", c: "A" },
  { d: "+2", c: "B" },
  { d: "+3", c: "C" },
  { d: "+4", c: "D" },
  { d: "+5", c: "E" },
  { d: "+6", c: "F" },
  { d: "+7", c: "G" },
  { d: "+8", c: "H" },
  { d: "+9", c: "I" },
  { d: "-0", c: "}" },
  { d: "-1", c: "J" },
  { d: "-2", c: "K" },
  { d: "-3", c: "L" },
  { d: "-4", c: "M" },
  { d: "-5", c: "N" },
  { d: "-6", c: "O" },
  { d: "-7", c: "P" },
  { d: "-8", c: "Q" },
  { d: "-9", c: "R" },
] as const;

const d2c = new Map<SIGNED_DIGIT, SIGNED_CHAR>(
  _SIGNED_CHARS.map(({ d, c }) => [d, c]),
);
const c2n = new Map<SIGNED_CHAR, SIGNED_DIGIT>(
  _SIGNED_CHARS.map(({ d, c }) => [c, d]),
);

/**
 * SIGNED_DIGIT: +0, +1, ..., +9, -0, -1, ..., -9
 */
type SIGNED_DIGIT = typeof _SIGNED_CHARS[number]["d"];
const SIGNED_DIGIT = (digit: SIGNED_DIGIT = "0") => ({
  /**
   * toChar +1 => "A"
   */
  toChar(): SIGNED_CHAR {
    return d2c.get(digit) as SIGNED_CHAR;
  },

  /**
   * isNegative -1 => true
   */
  isNegative(): boolean {
    return digit.startsWith("-");
  },

  /**
   * toNumber +1 => 1
   */
  toNumber(): number {
    return Number(digit);
  },
});

/**
 * parse 1234 => +4
 */
SIGNED_DIGIT.parse = (n: number) =>
  SIGNED_DIGIT((n < 0 ? "-" : "+") + Math.abs(n) % 10 as SIGNED_DIGIT);

/**
 * SIGNED_CHAR: "{", "A", ..., "I", "}", "J", ..., "R"
 */
type SIGNED_CHAR = typeof _SIGNED_CHARS[number]["c"];
const SIGNED_CHAR = (c: SIGNED_CHAR) => ({
  /**
   * toDigit "A" => +1
   */
  toDigit(): SIGNED_DIGIT {
    return c2n.get(c) as SIGNED_DIGIT;
  },
});

/**
 * parse "000A" => "A"
 */
SIGNED_CHAR.parse = (str: string) => {
  str = str.slice(-1);
  return SIGNED_CHAR(
    c2n.has(str as SIGNED_CHAR)
      ? str as SIGNED_CHAR
      : d2c.get("0") as SIGNED_CHAR,
  );
};

/**
 * SIGNED_NUMBER is S9(4), S9999, etc.
 */
export type SIGNED_NUMBER = number & { __COBOL_JS_SIGNED_NUMBER: never };

/**
 * SIGNED_NUMBER object
 *
 * e.g.
 * ```js
 * const a = SIGNED_NUMBER.parse("000A").as() // 1
 * const b = 10;
 * const c = SIGNED_NUMBER(a + b).toString(4) // "001A"
 * ```
 */
export const SIGNED_NUMBER = (n: number = 0): {
  as(): SIGNED_NUMBER;
  toString(length?: number): string;
} => ({
  /**
   * Alias of `as`
   */
  as(): SIGNED_NUMBER {
    return n as SIGNED_NUMBER;
  },

  /**
   * toString
   *
   * e.g.
   * ```js
   * SIGEND_NUMBER.toString(0)      // = "{"
   * SIGEND_NUMBER.toString(3)      // = "C"
   * SIGEND_NUMBER.toString(33)     // = "3C"
   * SIGEND_NUMBER.toString(-10, 4) // = "001}"
   * ```
   */
  toString: (length = 0): string => {
    const char = SIGNED_DIGIT.parse(n).toChar();
    return (n > -10 && n < 10
      ? char
      : Math.floor(Math.abs(n) / 10).toString() + char)
      .padStart(length, "0");
  },
});

/**
 * parse String
 *
 * e.g.
 * ```js
 * const a = SIGNED_NUMBER.parse("000A").as() // 1
 * const b = 10;
 * const c = SIGNED_NUMBER(a + b).toString(4) // "001A"
 * ```
 */
SIGNED_NUMBER.parse = (str: string): ReturnType<typeof SIGNED_NUMBER> => {
  const trancate = Number(str.slice(0, -1)) * 10;
  const digit = SIGNED_DIGIT(SIGNED_CHAR.parse(str).toDigit());
  return SIGNED_NUMBER(
    (trancate + Math.abs(digit.toNumber())) * (digit.isNegative() ? -1 : 1),
  );
};

/**
 * toString
 *
 * e.g.
 * ```js
 * SIGEND_NUMBER.toString(0)      // = "{"
 * SIGEND_NUMBER.toString(3)      // = "C"
 * SIGEND_NUMBER.toString(33)     // = "3C"
 * SIGEND_NUMBER.toString(-10, 4) // = "001}"
 * ```
 */
SIGNED_NUMBER.toString = (n: number, length = 0): string =>
  SIGNED_NUMBER(n).toString(length);
