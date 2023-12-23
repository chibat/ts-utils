const encoder = new TextEncoder();
const decoder = new TextDecoder();

export function stringToBase64(string: string): string {
  return btoa(String.fromCharCode(...encoder.encode(string)));
}

export function base64ToString(string: string): string {
  return decoder.decode(Uint8Array.from(atob(string), (x) => x.charCodeAt(0)));
}
