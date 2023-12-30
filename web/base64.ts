const encoder = new TextEncoder();
const decoder = new TextDecoder();

export function stringToBase64(string: string): string {
  return btoa(String.fromCharCode(...encoder.encode(string)));
}

export function base64ToString(base64: string): string {
  return decoder.decode(Uint8Array.from(atob(base64), (x) => x.charCodeAt(0)));
}

export function serialize(object: object): string {
  return stringToBase64(JSON.stringify(object));
}

export function desrialize<T>(base64: string): T {
  return JSON.parse(base64ToString(base64));
}
