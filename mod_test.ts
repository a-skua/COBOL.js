import { assertEquals } from "@std/assert";
import { SIGNED_NUMBER, UNSIGNED_NUMBER } from "./mod.ts";

Deno.test("SIGNED_NUMBER", async (t) => {
  await t.step("SIGNED_NUMBER().as() => 0", () => {
    assertEquals(SIGNED_NUMBER().as(), 0);
  });

  await t.step("SIGNED_NUMBER().toString() => {", () => {
    assertEquals(SIGNED_NUMBER().toString(), "{");
  });

  {
    const tests = [
      [8, "0000000{"],
    ] as const;

    for (const [len, expected] of tests) {
      await t.step(`SIGNED_NUMBER().toString(${len}) => ${expected}`, () => {
        assertEquals(SIGNED_NUMBER().toString(len), expected);
      });
    }
  }

  {
    const tests = [
      [-1, -1],
      [0, 0],
      [1, 1],
    ] as const;

    for (const [input, expected] of tests) {
      await t.step(`SIGNED_NUMBER(${input}).as() => ${expected}`, () => {
        const actual = SIGNED_NUMBER(input).as();
        assertEquals(actual, expected as SIGNED_NUMBER);
      });
    }
  }
});

Deno.test("SIGNED_NUMBER.parse", async (t) => {
  const tests = [
    ["0", 0],
    ["1", 1],
    ["2", 2],
    ["3", 3],
    ["4", 4],
    ["5", 5],
    ["6", 6],
    ["7", 7],
    ["8", 8],
    ["9", 9],
    ["{", 0],
    ["A", 1],
    ["B", 2],
    ["C", 3],
    ["D", 4],
    ["E", 5],
    ["F", 6],
    ["G", 7],
    ["H", 8],
    ["I", 9],
    ["}", 0],
    ["J", -1],
    ["K", -2],
    ["L", -3],
    ["M", -4],
    ["N", -5],
    ["O", -6],
    ["P", -7],
    ["Q", -8],
    ["R", -9],
    ["0010", 10],
    ["0011", 11],
    ["0012", 12],
    ["0013", 13],
    ["0014", 14],
    ["0015", 15],
    ["0016", 16],
    ["0017", 17],
    ["0018", 18],
    ["0019", 19],
    ["001{", 10],
    ["001A", 11],
    ["001B", 12],
    ["001C", 13],
    ["001D", 14],
    ["001E", 15],
    ["001F", 16],
    ["001G", 17],
    ["001H", 18],
    ["001I", 19],
    ["001}", -10],
    ["001J", -11],
    ["001K", -12],
    ["001L", -13],
    ["001M", -14],
    ["001N", -15],
    ["001O", -16],
    ["001P", -17],
    ["001Q", -18],
    ["001R", -19],
  ] as const;

  for (const [input, expected] of tests) {
    await t.step(`SIGNED_NUMBER.parse(${input}) => ${expected}`, () => {
      const actual = SIGNED_NUMBER.parse(input);
      assertEquals(actual.as(), expected as SIGNED_NUMBER);
    });
  }
});

Deno.test("SIGNED_NUMBER.toString", async (t) => {
  {
    const tests = [
      [0, "{"],
      [1, "A"],
      [2, "B"],
      [3, "C"],
      [4, "D"],
      [5, "E"],
      [6, "F"],
      [7, "G"],
      [8, "H"],
      [9, "I"],
      [-10, "1}"],
      [-1, "J"],
      [-2, "K"],
      [-3, "L"],
      [-4, "M"],
      [-5, "N"],
      [-6, "O"],
      [-7, "P"],
      [-8, "Q"],
      [-9, "R"],
    ] as const;

    for (const [sn, expected] of tests) {
      await t.step(`SIGNED_NUMBER.toString(${sn}) => ${expected}`, () => {
        const actual = SIGNED_NUMBER.toString(sn);
        assertEquals(actual, expected);
      });
    }
  }

  {
    const tests = [
      [0, 4, "000{"],
      [1, 4, "000A"],
      [2, 4, "000B"],
      [3, 4, "000C"],
      [4, 4, "000D"],
      [5, 4, "000E"],
      [6, 4, "000F"],
      [7, 4, "000G"],
      [8, 4, "000H"],
      [9, 4, "000I"],
      [-1, 4, "000J"],
      [-2, 4, "000K"],
      [-3, 4, "000L"],
      [-4, 4, "000M"],
      [-5, 4, "000N"],
      [-6, 4, "000O"],
      [-7, 4, "000P"],
      [-8, 4, "000Q"],
      [-9, 4, "000R"],
      [10, 4, "001{"],
      [11, 4, "001A"],
      [12, 4, "001B"],
      [13, 4, "001C"],
      [14, 4, "001D"],
      [15, 4, "001E"],
      [16, 4, "001F"],
      [17, 4, "001G"],
      [18, 4, "001H"],
      [19, 4, "001I"],
      [-10, 4, "001}"],
      [-11, 4, "001J"],
      [-12, 4, "001K"],
      [-13, 4, "001L"],
      [-14, 4, "001M"],
      [-15, 4, "001N"],
      [-16, 4, "001O"],
      [-17, 4, "001P"],
      [-18, 4, "001Q"],
      [-19, 4, "001R"],
    ] as const;

    for (const [sn, len, expected] of tests) {
      await t.step(
        `SIGNED_NUMBER.toString(${sn}, ${len}) => ${expected}`,
        () => {
          const actual = SIGNED_NUMBER.toString(sn, len);
          assertEquals(actual, expected);
        },
      );
    }
  }
});

Deno.test("UNSIGNED_NUMBER", async (t) => {
  await t.step("UNSIGNED_NUMBER().as() => 0", () => {
    const actual = UNSIGNED_NUMBER().as();
    assertEquals(actual, 0);
  });

  await t.step("UNSIGNED_NUMBER().toString() => 0", () => {
    const actual = UNSIGNED_NUMBER().toString();
    assertEquals(actual, "0");
  });

  {
    const tests = [
      [8, "00000000"],
    ] as const;

    for (const [len, expected] of tests) {
      await t.step(`UNSIGNED_NUMBER().toString(${len}) => ${expected}`, () => {
        const actual = UNSIGNED_NUMBER().toString(len);
        assertEquals(actual, expected);
      });
    }
  }

  {
    const tests = [
      [0, 0],
      [1, 1],
      [2, 2],
    ] as const;

    for (const [input, expected] of tests) {
      await t.step(`UNSIGNED_NUMBER(${input}).as() => ${expected}`, () => {
        const actual = UNSIGNED_NUMBER(input);
        assertEquals(actual.as(), expected as UNSIGNED_NUMBER);
      });
    }
  }
});

Deno.test("UNSIGNED_NUMBER.parse", async (t) => {
  {
    const tests = [
      ["0", 0],
      ["1", 1],
      ["2", 2],
      ["3", 3],
      ["4", 4],
      ["5", 5],
      ["6", 6],
      ["7", 7],
      ["8", 8],
      ["9", 9],
      ["0010", 10],
      ["0011", 11],
      ["0012", 12],
      ["0013", 13],
      ["0014", 14],
      ["0015", 15],
      ["0016", 16],
      ["0017", 17],
      ["0018", 18],
      ["0019", 19],
    ] as const;

    for (const [input, expected] of tests) {
      await t.step(
        `UNSIGNED_NUMBER.parse(${input}).as() => ${expected}`,
        () => {
          const actual = UNSIGNED_NUMBER.parse(input);
          assertEquals(actual.as(), expected as UNSIGNED_NUMBER);
        },
      );
    }
  }
});

Deno.test("UNSIGNED_NUMBER.toString", async (t) => {
  {
    const tests = [
      [-1, "1"],
      [-2, "2"],
      [-3, "3"],
      [-4, "4"],
      [-5, "5"],
      [-6, "6"],
      [-7, "7"],
      [-8, "8"],
      [-9, "9"],
      [0, "0"],
      [1, "1"],
      [2, "2"],
      [3, "3"],
      [4, "4"],
      [5, "5"],
      [6, "6"],
      [7, "7"],
      [8, "8"],
      [9, "9"],
      [10, "10"],
      [11, "11"],
      [12, "12"],
      [13, "13"],
      [14, "14"],
      [15, "15"],
      [16, "16"],
      [17, "17"],
      [18, "18"],
      [19, "19"],
    ] as const;

    for (const [un, expected] of tests) {
      await t.step(`UNSIGNED_NUMBER.toString(${un}) => ${expected}`, () => {
        const actual = UNSIGNED_NUMBER.toString(un);
        assertEquals(actual, expected);
      });
    }
  }

  {
    const tests = [
      [-1, 4, "0001"],
      [-2, 4, "0002"],
      [-3, 4, "0003"],
      [-4, 4, "0004"],
      [-5, 4, "0005"],
      [-6, 4, "0006"],
      [-7, 4, "0007"],
      [-8, 4, "0008"],
      [-9, 4, "0009"],
      [0, 4, "0000"],
      [1, 4, "0001"],
      [2, 4, "0002"],
      [3, 4, "0003"],
      [4, 4, "0004"],
      [5, 4, "0005"],
      [6, 4, "0006"],
      [7, 4, "0007"],
      [8, 4, "0008"],
      [9, 4, "0009"],
      [10, 4, "0010"],
      [11, 4, "0011"],
      [12, 4, "0012"],
      [13, 4, "0013"],
      [14, 4, "0014"],
      [15, 4, "0015"],
      [16, 4, "0016"],
      [17, 4, "0017"],
      [18, 4, "0018"],
      [19, 4, "0019"],
    ] as const;

    for (const [un, len, expected] of tests) {
      await t.step(
        `UNSIGNED_NUMBER.toString(${un}, ${len}) => ${expected}`,
        () => {
          const actual = UNSIGNED_NUMBER.toString(un, len);
          assertEquals(actual, expected);
        },
      );
    }
  }
});
