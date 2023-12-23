import { assertEquals } from "std/testing/asserts.ts";
import { getLocales } from "./request.ts";

Deno.test("locale", () => {
  const request = new Request("http://localhost:8000");
  request.headers.set("Accept-Language", "ja,en");
  const locales = getLocales(request);
  assertEquals(locales.at(0)?.language, "ja");
  assertEquals(locales.at(1)?.language, "en");
});
