import { PublicKey } from "@solana/web3.js";
import { toUint8Array } from "js-base64";
import { Base64EncodedAddress} from "@solana-mobile/mobile-wallet-adapter-protocol";

/**
 * Takes a base 64 encoded address, converts it back to binary with a byte array
 * then returns a public key
 * 
 * @param  {Base64EncodedAddress} address - base64 string
 * @returns {PublicKey} - Returns a public key
 */
export function getPublicKeyFromAddress(address: Base64EncodedAddress): PublicKey {
    const publicKeyByteArray = toUint8Array(address);
    return new PublicKey(publicKeyByteArray);
}