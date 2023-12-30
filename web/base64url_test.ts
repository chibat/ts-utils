import { assertEquals } from "std/testing/asserts.ts";
import {
  base64ToBase64Url,
  base64urlToBase64,
  base64urlToString,
  desrialize,
  serialize,
  stringToBase64url,
} from "./base64url.ts";

Deno.test("base64ToBase64Url base64urlToBase64", () => {
  const original = "a+b/cd==";
  // const original = "abcd";
  const base64url = base64ToBase64Url(original);
  console.log(base64url);
  const base64 = base64urlToBase64(base64url);
  assertEquals(base64, original);
});

Deno.test("stringToBase64 base64ToString", () => {
  const original = "こんにちは、日本語!";
  const encoded = stringToBase64url(original);
  console.info(encoded);
  const decoded = base64urlToString(encoded);
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
