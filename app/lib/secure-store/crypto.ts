import CryptoES from "crypto-es";
//@ts-ignore
import {EXPO_CRYPTO_KEY} from "@env";

export function decryptJSON(str: string | null) : object | string | null {
    if(!str) return null
    const decrypted = CryptoES.AES.decrypt(str, EXPO_CRYPTO_KEY).toString(CryptoES.enc.Utf8)
    const decryptedJSON = JSON.parse(decrypted)

    return decryptedJSON
}

export function encryptJSON(obj: object | string) : string | null{
    if(!obj) return null
    let str = JSON.stringify(obj)
    let encryptedStr = CryptoES.AES.encrypt(str, EXPO_CRYPTO_KEY).toString()
    return encryptedStr
}