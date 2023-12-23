import { decode, encode } from "npm:@msgpack/msgpack";

export function serialize(object: object): string {
  return btoa(String.fromCharCode(...encode(object)));
}

export function desrialize(base64: string): unknown {
  return decode(Uint8Array.from(atob(base64), (x) => x.charCodeAt(0)));
}
