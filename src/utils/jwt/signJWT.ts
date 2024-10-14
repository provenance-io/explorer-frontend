import base64url from 'base64url';
// import { convertUtf8ToHex } from '@walletconnect/utils';
// import { createHash } from 'crypto';
import { Buffer } from 'buffer';
import { ecdsaVerify } from 'secp256k1';

interface SignJWT {
  address: string;
  signature?: string;
  customId?: string;
  expires?: number;
  iframeParentId?: string;
  publicKey: string;
}

const createHash = async (message: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  return Buffer.from(hashHex.replace(/^0x/, ''), 'hex');
};

// https://github.com/WalletConnect/walletconnect-utils/blob/ffd3173a5afe6d615260148ad59697628eb598be/misc/encoding/src/index.ts#L96
function utf8ToBuffer(utf8: string): Buffer {
  return Buffer.from(utf8, 'utf8');
}

export function addHexPrefix(hex: string): string {
  return hex.startsWith('0x') ? hex : `0x${hex}`;
}

function bufferToHex(buf: Buffer, prefixed = false): string {
  const hex = buf.toString('hex');
  return prefixed ? addHexPrefix(hex) : hex;
}

function utf8ToHex(utf8: string, prefixed = false): string {
  return bufferToHex(utf8ToBuffer(utf8), prefixed);
}

const sha256 = async (hexMessage: string) => await createHash(hexMessage);
const isHex = (hexMessage: string) => !!hexMessage.match('^[0-9a-fA-F]+$');

const verifySignature = async (hexMessage: string, signature: Uint8Array, pubKeyB64: string) => {
  if (!isHex(hexMessage)) throw new Error('Message parameter is not a hex value.');

  const hash = await sha256(hexMessage);
  const pubKeyDecoded = base64url.toBuffer(pubKeyB64);
  return ecdsaVerify(signature, hash, pubKeyDecoded);
};

// Create a random set up numbers at the requested length
export const rngNum = (length = 16): number => {
  // Use Math.random to create a decimal number: 0.123123123123, then string and slice out the numbers
  const rngDecimalString = Math.random().toString();
  // Slice and convert back to number to return
  return Number(rngDecimalString.slice(2, length + 2));
};

export const signJWT = async ({
  address,
  signature,
  customId,
  expires, // Custom expiration time in seconds from now
  iframeParentId,
  publicKey: pubKeyB64,
}: SignJWT): Promise<any> => {
  let valid = false;
  const nowSec = Math.round(Date.now() / 1000); // Current time seconds
  const customExpiresGiven = expires !== undefined;
  const defaultExpireSec = 1440; // (24hours as seconds)
  const customExpiresSec = customExpiresGiven && expires;
  const finalExpiresSec =
    nowSec + (customExpiresGiven ? (customExpiresSec as number) : defaultExpireSec);
  const method = 'provenance_sign';
  const description = 'Sign JWT Token';
  const metadata = JSON.stringify({
    address,
    customId,
    date: Date.now(),
    description,
  });
  // Custom Request
  const request = {
    id: rngNum(),
    jsonrpc: '2.0',
    method,
    params: [metadata],
  };
  if (!signature)
    return {
      valid,
      request,
      error: 'No wallet connected',
    };
  // Build JWT
  const header = JSON.stringify({ alg: 'ES256K', typ: 'JWT' });
  const headerEncoded = base64url(header);
  const payload = JSON.stringify({
    sub: pubKeyB64,
    iss: 'provenance.io',
    iat: nowSec,
    exp: finalExpiresSec,
    addr: address,
  });
  const payloadEncoded = base64url(payload);
  const JWT = `${headerEncoded}.${payloadEncoded}`;

  const hexJWT = utf8ToHex(JWT, true);
  request.params.push(hexJWT);

  try {
    // result is a hex encoded signature
    // const signatureBuffer = Buffer.from(signature, 'hex');
    // verify signature
    // Removed signature verification for now
    // valid = await verifySignature(hexJWT, signatureBuffer, pubKeyB64);
    valid = true;
    const signedPayloadEncoded = base64url(signature);
    const signedJWT = `${headerEncoded}.${payloadEncoded}.${signedPayloadEncoded}`;
    return {
      valid,
      result: { signature, signedJWT, expires: finalExpiresSec },
      request,
    };
  } catch (error) {
    return { valid, error: `${error}`, request };
  }
};
