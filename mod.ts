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
 * SIGNED_DIGIT
 *
 * e.g. +0, +1, ..., +9, -0, -1, ..., -9
 */
type SIGNED_DIGIT = typeof _SIGNED_CHARS[number]["d"];
const SIGNED_DIGIT = Object.assign(
  (digit: SIGNED_DIGIT = "0") => ({
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
  }),
  {
    /**
     * parse 1234 => +4
     */
    parse(n: number) {
      return SIGNED_DIGIT(
        (n < 0 ? "-" : "+") + Math.abs(n) % 10 as SIGNED_DIGIT,
      );
    },
  },
);

/**
 * SIGNED_CHAR
 *
 * e.g. "{", "A", ..., "I", "}", "J", ..., "R"
 */
type SIGNED_CHAR = typeof _SIGNED_CHARS[number]["c"];
const SIGNED_CHAR = Object.assign(
  (c: SIGNED_CHAR) => ({
    /**
     * toDigit "A" => +1
     */
    toDigit(): SIGNED_DIGIT {
      return c2n.get(c) as SIGNED_DIGIT;
    },
  }),
  {
    /**
     * parse "000A" => "A"
     */
    parse(str: string) {
      str = str.slice(-1);
      return SIGNED_CHAR(
        c2n.has(str as SIGNED_CHAR)
          ? str as SIGNED_CHAR
          : d2c.get("0") as SIGNED_CHAR,
      );
    },
  },
);

/**
 * SIGNED_NUMBER
 *
 * e.g. S9(4), S9999, etc.
 */
export type SIGNED_NUMBER = number & { __COBOL_JS_SIGNED_NUMBER: never };

/**
 * SIGNED_NUMBER_FUNCTION
 *
 * e.g.
 * ```js
 * const a = SIGNED_NUMBER().as();          // 0 as SIGNED_NUMBER
 * const b = SIGNED_NUMBER(10).toString(8); // "0000001A"
 * ```
 */
type SIGNED_NUMBER_FUNCTION = (n?: number) => {
  /**
   * Alias of `as`
   *
   * e.g.
   * ```js
   * const a = SIGNED_NUMBER(1).as(); // 1 as SIGNED_NUMBER
   * ```
   */
  as(): SIGNED_NUMBER;

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
  toString(length?: number): string;
};

/**
 * SIGNED_NUMBER_OBJECT
 *
 * e.g.
 * ```js
 * const a = SIGNED_NUMBER.parse("00001A").as(); // 10
 * const b = 1;                                  // 1
 * const c = SIGNED_NUMBER(a - b).toString(6);   // "00001{"
 * ```
 */
type SIGNED_NUMBER_OBJECT = SIGNED_NUMBER_FUNCTION & {
  /**
   * parse String
   *
   * e.g.
   * ```js
   * const a = SIGNED_NUMBER.parse("00001{").as(); //  10
   * const b = STRIGN_NUMBER.parse("00001}").as(); // -10
   * ```
   */
  parse(str: string): ReturnType<SIGNED_NUMBER_FUNCTION>;

  /**
   * to String
   *
   * e.g.
   * ```js
   * const a = SIGEND_NUMBER.toString(10);     // = "1{"
   * const b = SIGEND_NUMBER.toString(-10, 6); // = "00001}"
   * ```
   */
  toString(n: number, length?: number): string;

  /**
   * as SIGNED_NUMBER
   *
   * e.g.
   * ```js
   * const a = SIGNED_NUMBER.as(1); // 1 as SIGNED_NUMBER
   * ```
   */
  as(n: number): SIGNED_NUMBER;
};

export const SIGNED_NUMBER: SIGNED_NUMBER_OBJECT = Object.assign(
  (n: number = 0) => ({
    as(): SIGNED_NUMBER {
      return n as SIGNED_NUMBER;
    },
    toString: (length = 0): string => {
      const char = SIGNED_DIGIT.parse(n).toChar();
      return (n > -10 && n < 10
        ? char
        : Math.floor(Math.abs(n) / 10).toString() + char)
        .padStart(length, "0");
    },
  }),
  {
    parse(str: string): ReturnType<typeof SIGNED_NUMBER> {
      const trancate = Number(str.slice(0, -1)) * 10;
      const digit = SIGNED_DIGIT(SIGNED_CHAR.parse(str).toDigit());
      return SIGNED_NUMBER(
        (trancate + Math.abs(digit.toNumber())) * (digit.isNegative() ? -1 : 1),
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
 * UNSIGNED_NUMBER
 *
 * e.g. 9(4), 9999, etc.
 */
export type UNSIGNED_NUMBER = number & { __COBOL_JS_UNSIGNED_NUMBER: never };

/**
 * UNSIGNED_NUMBER_FUNCTION
 *
 * e.g.
 * ```js
 * const a = UNSIGNED_NUMBER().as();          // 0 as UNSIGNED_NUMBER
 * const b = UNSIGNED_NUMBER(10).toString(8); // "00000010"
 * ```
 */
type UNSIGNED_NUMBER_FUNCTION = (n?: number) => {
  /**
   * Alias of `as`
   *
   * e.g.
   * ```js
   * const a = UNSIGNED_NUMBER(1).as(); // 1 as UNSIGNED_NUMBER
   * `
   */
  as(): UNSIGNED_NUMBER;

  /**
   * toString
   *
   * e.g.
   * ```js
   * UNSIGNED_NUMBER.toString(0)      // = "0"
   * UNSIGNED_NUMBER.toString(3)      // = "3"
   * UNSIGNED_NUMBER.toString(33)     // = "33"
   * UNSIGNED_NUMBER.toString(-10, 4) // = "0010"
   * ```
   */
  toString(length?: number): string;
};

/**
 * UNSIGNED_NUMBER_OBJECT
 *
 * e.g.
 * ```js
 * const a = UNSIGNED_NUMBER.parse("000010").as(); // 10
 * const b = 1;                                    // 1
 * const c = UNSIGNED_NUMBER(a - b).toString(6);   // "000009"
 * ```
 */
export type UNSIGNED_NUMBER_OBJECT = UNSIGNED_NUMBER_FUNCTION & {
  /**
   * parse String
   *
   * e.g.
   * ```js
   * const a = UNSIGNED_NUMBER.parse("000010").as(); // 10
   * const b = UNSIGNED_NUMBER.parse("000009").as(); // 9
   * ```
   */
  parse(str: string): ReturnType<UNSIGNED_NUMBER_FUNCTION>;

  /**
   * to String
   *
   * e.g.
   * ```js
   * const a = UNSIGNED_NUMBER.toString(10);     // = "10"
   * const b = UNSIGNED_NUMBER.toString(-10, 6); // = "000010"
   * ```
   */
  toString(n: number, length?: number): string;

  /**
   * as UNSIGNED_NUMBER
   *
   * e.g.
   * ```js
   * const a = UNSIGNED_NUMBER.as(1); // 1 as UNSIGNED_NUMBER
   * ```
   */
  as(n: number): UNSIGNED_NUMBER;
};

export const UNSIGNED_NUMBER: UNSIGNED_NUMBER_OBJECT = Object.assign(
  (n: number = 0) => ({
    as(): UNSIGNED_NUMBER {
      return n as UNSIGNED_NUMBER;
    },
    toString: (length = 0): string => {
      return Math.abs(n).toString().padStart(length, "0");
    },
  }),
  {
    parse(str: string): ReturnType<typeof UNSIGNED_NUMBER> {
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
