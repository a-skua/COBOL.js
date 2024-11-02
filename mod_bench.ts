import { SIGNED_NUMBER, UNSIGNED_NUMBER } from "@askua/cobol";

Deno.bench("Dynamic import", async () => {
  await import("@askua/cobol");
});

Deno.bench("SIGNED_NUMBER.parse", () => {
  SIGNED_NUMBER.parse("0000001{").as();
});

Deno.bench("SIGNED_NUMBER.toString", () => {
  SIGNED_NUMBER.toString(10, 8);
});

Deno.bench("UNSIGNED_NUMBER.parse", () => {
  UNSIGNED_NUMBER.parse("0000001{").as();
});

Deno.bench("UNSIGNED_NUMBER.toString", () => {
  UNSIGNED_NUMBER.toString(10, 8);
});
