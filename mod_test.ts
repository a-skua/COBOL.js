import { assertEquals } from "@std/assert";
import { SIGNED_NUMBER } from "./mod.ts";

Deno.test("SIGNED_NUMBER", async (t) => {
  await t.step("new()", () => {
    assertEquals(SIGNED_NUMBER(), 0);
  });

  await t.step("new(/* NUMBER */)", () => {
    assertEquals(SIGNED_NUMBER(1), 1, "number -> SIGNED_NUMBER");
  });

  await t.step("toString(/* NUMBER */)", () => {
    const tests = [
      [SIGNED_NUMBER(0), "{", '+0 -> "{"'],
      [SIGNED_NUMBER(1), "A", '+1 -> "A"'],
      [SIGNED_NUMBER(2), "B", '+2 -> "B"'],
      [SIGNED_NUMBER(3), "C", '+3 -> "C"'],
      [SIGNED_NUMBER(4), "D", '+4 -> "D"'],
      [SIGNED_NUMBER(5), "E", '+5 -> "E"'],
      [SIGNED_NUMBER(6), "F", '+6 -> "F"'],
      [SIGNED_NUMBER(7), "G", '+7 -> "G"'],
      [SIGNED_NUMBER(8), "H", '+8 -> "H"'],
      [SIGNED_NUMBER(9), "I", '+9 -> "I"'],
      [SIGNED_NUMBER(-10), "1}", '-10 -> "1}"'],
      [SIGNED_NUMBER(-1), "J", '-1 -> "J"'],
      [SIGNED_NUMBER(-2), "K", '-2 -> "K"'],
      [SIGNED_NUMBER(-3), "L", '-3 -> "L"'],
      [SIGNED_NUMBER(-4), "M", '-4 -> "M"'],
      [SIGNED_NUMBER(-5), "N", '-5 -> "N"'],
      [SIGNED_NUMBER(-6), "O", '-6 -> "O"'],
      [SIGNED_NUMBER(-7), "P", '-7 -> "P"'],
      [SIGNED_NUMBER(-8), "Q", '-8 -> "Q"'],
      [SIGNED_NUMBER(-9), "R", '-9 -> "R"'],
    ] as const;

    for (const [sn, expected, message] of tests) {
      assertEquals(SIGNED_NUMBER.toString(sn), expected, message);
    }
  });

  await t.step("toString(/* NUMBER */, /* LENGTH */)", () => {
    const tests = [
      [SIGNED_NUMBER(0), 4, "000{", '+0 -> "000{"'],
      [SIGNED_NUMBER(1), 4, "000A", '+1 -> "000A"'],
      [SIGNED_NUMBER(2), 4, "000B", '+2 -> "000B"'],
      [SIGNED_NUMBER(3), 4, "000C", '+3 -> "000C"'],
      [SIGNED_NUMBER(4), 4, "000D", '+4 -> "000D"'],
      [SIGNED_NUMBER(5), 4, "000E", '+5 -> "000E"'],
      [SIGNED_NUMBER(6), 4, "000F", '+6 -> "000F"'],
      [SIGNED_NUMBER(7), 4, "000G", '+7 -> "000G"'],
      [SIGNED_NUMBER(8), 4, "000H", '+8 -> "000H"'],
      [SIGNED_NUMBER(9), 4, "000I", '+9 -> "000I"'],
      [SIGNED_NUMBER(-1), 4, "000J", '-1 -> "000J"'],
      [SIGNED_NUMBER(-2), 4, "000K", '-2 -> "000K"'],
      [SIGNED_NUMBER(-3), 4, "000L", '-3 -> "000L"'],
      [SIGNED_NUMBER(-4), 4, "000M", '-4 -> "000M"'],
      [SIGNED_NUMBER(-5), 4, "000N", '-5 -> "000N"'],
      [SIGNED_NUMBER(-6), 4, "000O", '-6 -> "000O"'],
      [SIGNED_NUMBER(-7), 4, "000P", '-7 -> "000P"'],
      [SIGNED_NUMBER(-8), 4, "000Q", '-8 -> "000Q"'],
      [SIGNED_NUMBER(-9), 4, "000R", '-9 -> "000{"'],
      [SIGNED_NUMBER(10), 4, "001{", '+10 -> "001{"'],
      [SIGNED_NUMBER(11), 4, "001A", '+11 -> "001A"'],
      [SIGNED_NUMBER(12), 4, "001B", '+12 -> "001B"'],
      [SIGNED_NUMBER(13), 4, "001C", '+13 -> "001C"'],
      [SIGNED_NUMBER(14), 4, "001D", '+14 -> "001D"'],
      [SIGNED_NUMBER(15), 4, "001E", '+15 -> "001E"'],
      [SIGNED_NUMBER(16), 4, "001F", '+16 -> "001F"'],
      [SIGNED_NUMBER(17), 4, "001G", '+17 -> "001G"'],
      [SIGNED_NUMBER(18), 4, "001H", '+18 -> "001H"'],
      [SIGNED_NUMBER(19), 4, "001I", '+19 -> "001I"'],
      [SIGNED_NUMBER(-10), 4, "001}", '-10 -> "001}"'],
      [SIGNED_NUMBER(-11), 4, "001J", '-11 -> "001J"'],
      [SIGNED_NUMBER(-12), 4, "001K", '-12 -> "001K"'],
      [SIGNED_NUMBER(-13), 4, "001L", '-13 -> "001L"'],
      [SIGNED_NUMBER(-14), 4, "001M", '-14 -> "001M"'],
      [SIGNED_NUMBER(-15), 4, "001N", '-15 -> "001N"'],
      [SIGNED_NUMBER(-16), 4, "001O", '-16 -> "001O"'],
      [SIGNED_NUMBER(-17), 4, "001P", '-17 -> "001P"'],
      [SIGNED_NUMBER(-18), 4, "001Q", '-18 -> "001Q"'],
      [SIGNED_NUMBER(-19), 4, "001R", '-19 -> "001R"'],
    ] as const;

    for (const [sn, len, expected, message] of tests) {
      assertEquals(SIGNED_NUMBER.toString(sn, len), expected, message);
    }
  });

  await t.step("parse(/* STRING */)", () => {
    const tests = [
      ["0", 0, '"0" -> +0'],
      ["1", 1, '"1" -> +1'],
      ["2", 2, '"2" -> +2'],
      ["3", 3, '"3" -> +3'],
      ["4", 4, '"4" -> +4'],
      ["5", 5, '"5" -> +5'],
      ["6", 6, '"6" -> +6'],
      ["7", 7, '"7" -> +7'],
      ["8", 8, '"8" -> +8'],
      ["9", 9, '"9" -> +9'],
      ["{", 0, '"{" -> +0'],
      ["A", 1, '"A" -> +1'],
      ["B", 2, '"B" -> +2'],
      ["C", 3, '"C" -> +3'],
      ["D", 4, '"D" -> +4'],
      ["E", 5, '"E" -> +5'],
      ["F", 6, '"F" -> +6'],
      ["G", 7, '"G" -> +7'],
      ["H", 8, '"H" -> +8'],
      ["I", 9, '"I" -> +9'],
      ["}", 0, '"}" -> -0'],
      ["J", -1, '"J" -> -1'],
      ["K", -2, '"K" -> -2'],
      ["L", -3, '"L" -> -3'],
      ["M", -4, '"M" -> -4'],
      ["N", -5, '"N" -> -5'],
      ["O", -6, '"O" -> -6'],
      ["P", -7, '"P" -> -7'],
      ["Q", -8, '"Q" -> -8'],
      ["R", -9, '"R" -> -9'],
      ["0010", 10, '"0" -> +0'],
      ["0011", 11, '"1" -> +1'],
      ["0012", 12, '"2" -> +2'],
      ["0013", 13, '"3" -> +3'],
      ["0014", 14, '"4" -> +4'],
      ["0015", 15, '"5" -> +5'],
      ["0016", 16, '"6" -> +6'],
      ["0017", 17, '"7" -> +7'],
      ["0018", 18, '"8" -> +8'],
      ["0019", 19, '"9" -> +9'],
      ["001{", 10, '"{" -> +0'],
      ["001A", 11, '"A" -> +1'],
      ["001B", 12, '"B" -> +2'],
      ["001C", 13, '"C" -> +3'],
      ["001D", 14, '"D" -> +4'],
      ["001E", 15, '"E" -> +5'],
      ["001F", 16, '"F" -> +6'],
      ["001G", 17, '"G" -> +7'],
      ["001H", 18, '"H" -> +8'],
      ["001I", 19, '"I" -> +9'],
      ["001}", -10, '"}" -> -0'],
      ["001J", -11, '"J" -> -1'],
      ["001K", -12, '"K" -> -2'],
      ["001L", -13, '"L" -> -3'],
      ["001M", -14, '"M" -> -4'],
      ["001N", -15, '"N" -> -5'],
      ["001O", -16, '"O" -> -6'],
      ["001P", -17, '"P" -> -7'],
      ["001Q", -18, '"Q" -> -8'],
      ["001R", -19, '"R" -> -9'],
    ] as const;

    for (const [input, expected, message] of tests) {
      assertEquals(
        SIGNED_NUMBER.parse(input),
        expected as SIGNED_NUMBER,
        message,
      );
    }
  });
});
