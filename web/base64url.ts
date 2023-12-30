import { base64ToString, stringToBase64 } from "./base64.ts";

export function base64urlToBase64(base64url: string) {
  const base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
  const r = base64.length % 4;
  if (r === 2) {
    return base64 + "==";
  } else if (r === 3) {
    return base64 + "=";
  }
  return base64;
}

export function base64ToBase64Url(base64: string) {
  return base64.replace(
    /\+/g,
    "-",
  ).replace(/\//g, "_").replace(/=/g, "");
}

export function stringToBase64url(string: string): string {
  return base64ToBase64Url(stringToBase64(string));
}

export function base64urlToString(base64url: string): string {
  return base64ToString(base64urlToBase64(base64url));
}

export function serialize(object: object): string {
  return stringToBase64url(JSON.stringify(object));
}

export function desrialize<T>(base64url: string): T {
  return JSON.parse(base64urlToString(base64url));
}
