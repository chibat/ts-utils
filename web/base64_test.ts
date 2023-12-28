import {
  base64ToString,
  desrialize,
  serialize,
  stringToBase64,
} from "./base64.ts";
import { assertEquals } from "std/testing/asserts.ts";

Deno.test("stringToBase64 base64ToString", () => {
  const original = "こんにちは、日本語";
  const encoded = stringToBase64(original);
  console.info(encoded);
  const decoded = base64ToString(encoded);
  assertEquals(decoded, original);
});

Deno.test("serialize desrialize", () => {
  const original = {
    nil: null,
    // ud: undefined,
    integer: 1,
    float: Math.PI,
    string: "Hello 日本語!",
    // bigint: 1n,
    // binary: Uint8Array.from([1, 2, 3]),
    array: [10, 20, 30],
    map: { foo: "bar" },
    // timestampExt: new Date(),
  };

  const serialized = serialize(original);
  console.log(serialized);
  const deserialized = desrialize(serialized);
  assertEquals(deserialized, original);
});
