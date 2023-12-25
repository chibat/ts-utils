import {
  decode,
  DecodeError,
  encode,
  ExtensionCodec,
} from "npm:@msgpack/msgpack";

// to define a custom codec:
const BIGINT_EXT_TYPE = 0; // Any in 0-127
const extensionCodec = new ExtensionCodec();
extensionCodec.register({
  type: BIGINT_EXT_TYPE,
  encode(input: unknown): Uint8Array | null {
    if (typeof input === "bigint") {
      if (
        input <= Number.MAX_SAFE_INTEGER && input >= Number.MIN_SAFE_INTEGER
      ) {
        return encode(Number(input));
      } else {
        return encode(String(input));
      }
    } else {
      return null;
    }
  },
  decode(data: Uint8Array): bigint {
    const val = decode(data);
    if (!(typeof val === "string" || typeof val === "number")) {
      throw new DecodeError(`unexpected BigInt source: ${val} (${typeof val})`);
    }
    return BigInt(val);
  },
});

export function serialize(object: object): string {
  return btoa(String.fromCharCode(...encode(object, { extensionCodec })));
}

export function desrialize(base64: string): unknown {
  return decode(Uint8Array.from(atob(base64), (x) => x.charCodeAt(0)), {
    extensionCodec,
  });
}
