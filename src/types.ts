type Brand<T, U> = T & { __COBOL_JS: U };

/**
 * SIGNED_CHAR
 */
type SIGNED_CHAR =
  | "{"
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "}"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R";
const SIGNED_CHAR = {
  /**
   * parse
   *
   * +0 --> "{"
   * +1 --> "A"
   * +2 --> "B"
   * +3 --> "C"
   * +4 --> "D"
   * +5 --> "E"
   * +6 --> "F"
   * +7 --> "G"
   * +8 --> "H"
   * +9 --> "I"
   * -0 --> "}"
   * -1 --> "J"
   * -2 --> "K"
   * -3 --> "L"
   * -4 --> "M"
   * -5 --> "N"
   * -6 --> "O"
   * -7 --> "P"
   * -8 --> "Q"
   * -9 --> "R"
   */
  parse(n: number): SIGNED_CHAR {
    switch (n % 10) {
      case 0:
        return (n >= 0 ? "{" : "}") as SIGNED_CHAR;
      case 1:
        return "A" as SIGNED_CHAR;
      case 2:
        return "B" as SIGNED_CHAR;
      case 3:
        return "C" as SIGNED_CHAR;
      case 4:
        return "D" as SIGNED_CHAR;
      case 5:
        return "E" as SIGNED_CHAR;
      case 6:
        return "F" as SIGNED_CHAR;
      case 7:
        return "G" as SIGNED_CHAR;
      case 8:
        return "H" as SIGNED_CHAR;
      case 9:
        return "I" as SIGNED_CHAR;
      case -1:
        return "J" as SIGNED_CHAR;
      case -2:
        return "K" as SIGNED_CHAR;
      case -3:
        return "L" as SIGNED_CHAR;
      case -4:
        return "M" as SIGNED_CHAR;
      case -5:
        return "N" as SIGNED_CHAR;
      case -6:
        return "O" as SIGNED_CHAR;
      case -7:
        return "P" as SIGNED_CHAR;
      case -8:
        return "Q" as SIGNED_CHAR;
      case -9:
        return "R" as SIGNED_CHAR;
      default:
        throw new Error("Invalid number");
    }
  },

  toNumber(c: SIGNED_CHAR): number {
    switch (c) {
      case "{":
      case "}":
        return 0;
      case "A":
      case "J":
        return 1;
      case "B":
      case "K":
        return 2;
      case "C":
      case "L":
        return 3;
      case "D":
      case "M":
        return 4;
      case "E":
      case "N":
        return 5;
      case "F":
      case "O":
        return 6;
      case "G":
      case "P":
        return 7;
      case "H":
      case "Q":
        return 8;
      case "I":
      case "R":
        return 9;
    }
  },
};

/**
 * SIGNED_NUMBER
 *
 * S9(4), S9999, etc.
 */
export type SIGNED_NUMBER = Brand<number, "SIGNED_NUMBER">;
export const SIGNED_NUMBER = {
  /**
   * new
   *
   * Alias of `as`
   * e.g.
   * SIGNED_NUMBER.new() // = 0 as SIGNED_NUMBER
   * SIGNED_NUMBER.new(1) // = 1 as SIGNED_NUMBER
   */
  new(value: number = 0): SIGNED_NUMBER {
    return value as SIGNED_NUMBER;
  },

  /**
   * parse
   *
   * e.g.
   * SIGNED_NUMBER.parse("0") // 0
   * SIGNED_NUMBER.parse("{") // 0
   * SIGNED_NUMBER.parse("1}") // -10
   * SIGNED_NUMBER.parse("001}") // -10
   */
  parse(str: string): SIGNED_NUMBER {
    const char = str.charAt(str.length - 1);
    switch (char) {
      case "{":
      case "A":
      case "B":
      case "C":
      case "D":
      case "E":
      case "F":
      case "G":
      case "H":
      case "I":
        return Number.parseInt(
          str.slice(0, -1) + SIGNED_CHAR.toNumber(char),
        ) as SIGNED_NUMBER;
      case "}":
      case "J":
      case "K":
      case "L":
      case "M":
      case "N":
      case "O":
      case "P":
      case "Q":
      case "R":
        return -Number.parseInt(
          str.slice(0, -1) + SIGNED_CHAR.toNumber(char),
        ) as SIGNED_NUMBER;
      default:
        return Number.parseInt(str, 10) as SIGNED_NUMBER;
    }
  },

  /**
   * toString
   *
   * e.g.
   * SIGEND_NUMBER.toString(0) // "{"
   * SIGEND_NUMBER.toString(3) // "C"
   * SIGEND_NUMBER.toString(-10, 4) // "001}"
   */
  toString(value: SIGNED_NUMBER, length = 0): string {
    const abs = Math.abs(value);
    if (abs < 10) return SIGNED_CHAR.parse(value).padStart(length, "0");
    return (Math.floor(abs / 10).toString() +
      SIGNED_CHAR.parse(value).toString()).padStart(length, "0");
  },
};
