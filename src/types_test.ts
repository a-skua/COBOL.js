import { assertEquals } from "assert";
import { SIGNED_NUMBER } from "./types.ts";

Deno.test("SIGNED_NUMBER", async (t) => {
  await t.step("new()", () => {
    assertEquals(SIGNED_NUMBER.new(), 0);
  });

  await t.step("new(/* NUMBER */)", () => {
    assertEquals(SIGNED_NUMBER.new(1), 1);
  });

  await t.step("toString(/* NUMBER */)", () => {
    // +0 --> "{"
    assertEquals(SIGNED_NUMBER.toString(0 as SIGNED_NUMBER), "{");
    // +1 --> "A"
    assertEquals(SIGNED_NUMBER.toString(1 as SIGNED_NUMBER), "A");
    // +2 --> "B"
    assertEquals(SIGNED_NUMBER.toString(2 as SIGNED_NUMBER), "B");
    // +3 --> "C"
    assertEquals(SIGNED_NUMBER.toString(3 as SIGNED_NUMBER), "C");
    // +4 --> "D"
    assertEquals(SIGNED_NUMBER.toString(4 as SIGNED_NUMBER), "D");
    // +5 --> "E"
    assertEquals(SIGNED_NUMBER.toString(5 as SIGNED_NUMBER), "E");
    // +6 --> "F"
    assertEquals(SIGNED_NUMBER.toString(6 as SIGNED_NUMBER), "F");
    // +7 --> "G"
    assertEquals(SIGNED_NUMBER.toString(7 as SIGNED_NUMBER), "G");
    // +8 --> "H"
    assertEquals(SIGNED_NUMBER.toString(8 as SIGNED_NUMBER), "H");
    // +9 --> "I"
    assertEquals(SIGNED_NUMBER.toString(9 as SIGNED_NUMBER), "I");
    // -0 --> "}"
    assertEquals(SIGNED_NUMBER.toString(-10 as SIGNED_NUMBER), "1}");
    // -1 --> "J"
    assertEquals(SIGNED_NUMBER.toString(-1 as SIGNED_NUMBER), "J");
    // -2 --> "K"
    assertEquals(SIGNED_NUMBER.toString(-2 as SIGNED_NUMBER), "K");
    // -3 --> "L"
    assertEquals(SIGNED_NUMBER.toString(-3 as SIGNED_NUMBER), "L");
    // -4 --> "M"
    assertEquals(SIGNED_NUMBER.toString(-4 as SIGNED_NUMBER), "M");
    // -5 --> "N"
    assertEquals(SIGNED_NUMBER.toString(-5 as SIGNED_NUMBER), "N");
    // -6 --> "O"
    assertEquals(SIGNED_NUMBER.toString(-6 as SIGNED_NUMBER), "O");
    // -7 --> "P"
    assertEquals(SIGNED_NUMBER.toString(-7 as SIGNED_NUMBER), "P");
    // -8 --> "Q"
    assertEquals(SIGNED_NUMBER.toString(-8 as SIGNED_NUMBER), "Q");
    // -9 --> "R"
    assertEquals(SIGNED_NUMBER.toString(-9 as SIGNED_NUMBER), "R");
  });

  await t.step("toString(/* NUMBER */, /* LENGTH */)", () => {
    assertEquals(SIGNED_NUMBER.toString(0 as SIGNED_NUMBER, 4), "000{");
    assertEquals(SIGNED_NUMBER.toString(1 as SIGNED_NUMBER, 4), "000A");
    assertEquals(SIGNED_NUMBER.toString(2 as SIGNED_NUMBER, 4), "000B");
    assertEquals(SIGNED_NUMBER.toString(3 as SIGNED_NUMBER, 4), "000C");
    assertEquals(SIGNED_NUMBER.toString(4 as SIGNED_NUMBER, 4), "000D");
    assertEquals(SIGNED_NUMBER.toString(5 as SIGNED_NUMBER, 4), "000E");
    assertEquals(SIGNED_NUMBER.toString(6 as SIGNED_NUMBER, 4), "000F");
    assertEquals(SIGNED_NUMBER.toString(7 as SIGNED_NUMBER, 4), "000G");
    assertEquals(SIGNED_NUMBER.toString(8 as SIGNED_NUMBER, 4), "000H");
    assertEquals(SIGNED_NUMBER.toString(9 as SIGNED_NUMBER, 4), "000I");
    assertEquals(SIGNED_NUMBER.toString(-1 as SIGNED_NUMBER, 4), "000J");
    assertEquals(SIGNED_NUMBER.toString(-2 as SIGNED_NUMBER, 4), "000K");
    assertEquals(SIGNED_NUMBER.toString(-3 as SIGNED_NUMBER, 4), "000L");
    assertEquals(SIGNED_NUMBER.toString(-4 as SIGNED_NUMBER, 4), "000M");
    assertEquals(SIGNED_NUMBER.toString(-5 as SIGNED_NUMBER, 4), "000N");
    assertEquals(SIGNED_NUMBER.toString(-6 as SIGNED_NUMBER, 4), "000O");
    assertEquals(SIGNED_NUMBER.toString(-7 as SIGNED_NUMBER, 4), "000P");
    assertEquals(SIGNED_NUMBER.toString(-8 as SIGNED_NUMBER, 4), "000Q");
    assertEquals(SIGNED_NUMBER.toString(-9 as SIGNED_NUMBER, 4), "000R");
    assertEquals(SIGNED_NUMBER.toString(10 as SIGNED_NUMBER, 4), "001{");
    assertEquals(SIGNED_NUMBER.toString(11 as SIGNED_NUMBER, 4), "001A");
    assertEquals(SIGNED_NUMBER.toString(12 as SIGNED_NUMBER, 4), "001B");
    assertEquals(SIGNED_NUMBER.toString(13 as SIGNED_NUMBER, 4), "001C");
    assertEquals(SIGNED_NUMBER.toString(14 as SIGNED_NUMBER, 4), "001D");
    assertEquals(SIGNED_NUMBER.toString(15 as SIGNED_NUMBER, 4), "001E");
    assertEquals(SIGNED_NUMBER.toString(16 as SIGNED_NUMBER, 4), "001F");
    assertEquals(SIGNED_NUMBER.toString(17 as SIGNED_NUMBER, 4), "001G");
    assertEquals(SIGNED_NUMBER.toString(18 as SIGNED_NUMBER, 4), "001H");
    assertEquals(SIGNED_NUMBER.toString(19 as SIGNED_NUMBER, 4), "001I");
    assertEquals(SIGNED_NUMBER.toString(-10 as SIGNED_NUMBER, 4), "001}");
    assertEquals(SIGNED_NUMBER.toString(-11 as SIGNED_NUMBER, 4), "001J");
    assertEquals(SIGNED_NUMBER.toString(-12 as SIGNED_NUMBER, 4), "001K");
    assertEquals(SIGNED_NUMBER.toString(-13 as SIGNED_NUMBER, 4), "001L");
    assertEquals(SIGNED_NUMBER.toString(-14 as SIGNED_NUMBER, 4), "001M");
    assertEquals(SIGNED_NUMBER.toString(-15 as SIGNED_NUMBER, 4), "001N");
    assertEquals(SIGNED_NUMBER.toString(-16 as SIGNED_NUMBER, 4), "001O");
    assertEquals(SIGNED_NUMBER.toString(-17 as SIGNED_NUMBER, 4), "001P");
    assertEquals(SIGNED_NUMBER.toString(-18 as SIGNED_NUMBER, 4), "001Q");
    assertEquals(SIGNED_NUMBER.toString(-19 as SIGNED_NUMBER, 4), "001R");
  });

  await t.step("parse(/* STRING */)", () => {
    assertEquals(SIGNED_NUMBER.parse("0"), 0);
    assertEquals(SIGNED_NUMBER.parse("1"), 1);
    assertEquals(SIGNED_NUMBER.parse("2"), 2);
    assertEquals(SIGNED_NUMBER.parse("3"), 3);
    assertEquals(SIGNED_NUMBER.parse("4"), 4);
    assertEquals(SIGNED_NUMBER.parse("5"), 5);
    assertEquals(SIGNED_NUMBER.parse("6"), 6);
    assertEquals(SIGNED_NUMBER.parse("7"), 7);
    assertEquals(SIGNED_NUMBER.parse("8"), 8);
    assertEquals(SIGNED_NUMBER.parse("9"), 9);
    // "{" --> +0
    assertEquals(SIGNED_NUMBER.parse("{"), 0);
    assertEquals(SIGNED_NUMBER.parse("001{"), 10);
    // "A" --> +1
    assertEquals(SIGNED_NUMBER.parse("A"), 1);
    assertEquals(SIGNED_NUMBER.parse("001A"), 11);
    // "B" --> +2
    assertEquals(SIGNED_NUMBER.parse("B"), 2);
    assertEquals(SIGNED_NUMBER.parse("001B"), 12);
    // "C" --> +3
    assertEquals(SIGNED_NUMBER.parse("C"), 3);
    assertEquals(SIGNED_NUMBER.parse("001C"), 13);
    // "D" --> +4
    assertEquals(SIGNED_NUMBER.parse("D"), 4);
    assertEquals(SIGNED_NUMBER.parse("001D"), 14);
    // "E" --> +5
    assertEquals(SIGNED_NUMBER.parse("E"), 5);
    assertEquals(SIGNED_NUMBER.parse("001E"), 15);
    // "F" --> +6
    assertEquals(SIGNED_NUMBER.parse("F"), 6);
    assertEquals(SIGNED_NUMBER.parse("001F"), 16);
    // "G" --> +7
    assertEquals(SIGNED_NUMBER.parse("G"), 7);
    assertEquals(SIGNED_NUMBER.parse("001G"), 17);
    // "H" --> +8
    assertEquals(SIGNED_NUMBER.parse("H"), 8);
    assertEquals(SIGNED_NUMBER.parse("001H"), 18);
    // "I" --> +9
    assertEquals(SIGNED_NUMBER.parse("I"), 9);
    assertEquals(SIGNED_NUMBER.parse("001I"), 19);
    // "}" --> -0
    assertEquals(SIGNED_NUMBER.parse("}"), 0);
    assertEquals(SIGNED_NUMBER.parse("001}"), -10);
    // "J" --> -1
    assertEquals(SIGNED_NUMBER.parse("J"), -1);
    assertEquals(SIGNED_NUMBER.parse("001J"), -11);
    // "K" --> -2
    assertEquals(SIGNED_NUMBER.parse("K"), -2);
    assertEquals(SIGNED_NUMBER.parse("001K"), -12);
    // "L" --> -3
    assertEquals(SIGNED_NUMBER.parse("L"), -3);
    assertEquals(SIGNED_NUMBER.parse("001L"), -13);
    // "M" --> -4
    assertEquals(SIGNED_NUMBER.parse("M"), -4);
    assertEquals(SIGNED_NUMBER.parse("001M"), -14);
    // "N" --> -5
    assertEquals(SIGNED_NUMBER.parse("N"), -5);
    assertEquals(SIGNED_NUMBER.parse("001N"), -15);
    // "O" --> -6
    assertEquals(SIGNED_NUMBER.parse("O"), -6);
    assertEquals(SIGNED_NUMBER.parse("001O"), -16);
    // "P" --> -7
    assertEquals(SIGNED_NUMBER.parse("P"), -7);
    assertEquals(SIGNED_NUMBER.parse("001P"), -17);
    // "Q" --> -8
    assertEquals(SIGNED_NUMBER.parse("Q"), -8);
    assertEquals(SIGNED_NUMBER.parse("001Q"), -18);
    // "R" --> -9
    assertEquals(SIGNED_NUMBER.parse("R"), -9);
    assertEquals(SIGNED_NUMBER.parse("001R"), -19);
  });
});
