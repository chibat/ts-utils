import { assertEquals } from "std/testing/asserts.ts";
import { CacheMap, LimitedSizeMap, stringifyMap } from "./maps.ts";

Deno.test("LimitedSizeMap", () => {
  const map = new LimitedSizeMap<string, number>(2);
  assertEquals(stringifyMap(map.set("ddd", 4)), '[["ddd",4]]');
  assertEquals(stringifyMap(map.set("ccc", 3)), '[["ddd",4],["ccc",3]]');
  assertEquals(stringifyMap(map.set("bbb", 2)), '[["ccc",3],["bbb",2]]');
  assertEquals(stringifyMap(map.set("aaa", 1)), '[["bbb",2],["aaa",1]]');
});

Deno.test("CacheMap", () => {
  const map = new CacheMap<string, number>({max: 2, expireMillis: 1000 * 2});
  map.set("aaa", 1);
  assertEquals(map.get("aaa"), 1);
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      assertEquals(map.get("aaa"), undefined);
      resolve();
    }, 1000 * 3);
  });
});
