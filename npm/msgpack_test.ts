import { assertEquals } from "std/testing/asserts.ts";
import { desrialize, serialize } from "./msgpack.ts";

Deno.test("serialize desrialize", () => {
  const originalObject = {
    nil: null,
    // ud: undefined,
    integer: 1,
    float: Math.PI,
    string: "Hello 日本語!",
    bingint: 1n,
    binary: Uint8Array.from([1, 2, 3]),
    array: [10, 20, 30],
    map: { foo: "bar" },
    timestampExt: new Date(),
  };

  const serialized = serialize(originalObject);
  console.log(serialized);
  const deserialized = desrialize(serialized);
  assertEquals(deserialized, originalObject);
});
