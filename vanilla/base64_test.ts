import { base64ToString, stringToBase64 } from "./base64.ts";
import { assertEquals } from "std/testing/asserts.ts";

Deno.test("string", () => {
  const original = "こんにちは、日本語";
  const encoded = stringToBase64(original);
  console.info(encoded);
  const decoded = base64ToString(encoded);
  assertEquals(decoded, original);
});
