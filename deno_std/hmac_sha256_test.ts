import { assertEquals } from "std/testing/asserts.ts";
import { sign } from "./hmac_sha256.ts";

Deno.test("LimitedSizeMap", async () => {
  assertEquals(
    await sign("value", "secret_key"),
    "27422a6d0d5995d9446d748c66623b24094586c3e16b19da9f55295d61bb98f0",
  );
});
