import { encode as encodeHex } from "std/encoding/hex.ts";

/**
 * HMAC SHA-256
 * The result is the same as below.
 * ```
 * echo -n "value" | openssl dgst -sha256 -hmac "secret_key"`
 * ```
 * 
 * @param data 
 * @param key 
 * @returns 
 */
export async function sign(data: string, key: string) {
  const encoder = new TextEncoder();
  const keyBuf = encoder.encode(key);

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyBuf,
    { name: "HMAC", hash: "SHA-256" },
    true,
    ["sign", "verify"],
  );

  const unit8Array = encoder.encode(data);
  const result = await crypto.subtle.sign("HMAC", cryptoKey, unit8Array.buffer);
  return new TextDecoder().decode(encodeHex(new Uint8Array(result)));
}

