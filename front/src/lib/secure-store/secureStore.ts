import * as SecureStore from "expo-secure-store";
import { decryptJSON } from "./crypto";

/**
 * Save item to the expo secure store
 * 
 * @param  {string} key - Name of the stored item
 * @param  {string} value - Value of the stored item
 * @returns {Promise<void>} - Returns nothing
 */
export async function save(key: string, value: string) : Promise<void>{
  await SecureStore.setItemAsync(key, value);
}

/**
 * Delete item from the expo secure store
 * 
 * @param  {string} key - Name of the stored item
 * @returns {Promise<void>} - Returns nothing
 */
export async function deleteValueFor(key: string) : Promise<void>{
  let result = await SecureStore.deleteItemAsync(key);
}

/**
 * Getter of value of expo secure stored item
 * 
 * @param  {string} key - Name of the stored item
 * @returns {Promise<string | null>} - Returns the value or null if item was missing
 */
export async function getValueFor(key: string) : Promise<string | null>{
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    return null;
  }
}

export async function getEncryptedValueFor(key: string): Promise<string | object | null>{
  let result = await getValueFor(key)
  let decryptedResult = decryptJSON(result)
  if(decryptedResult)
    return decryptedResult;
  else
    return null
}

/**
 * Create an alert to show the value of expo secure stored item
 * 
 * @param  {string} key - Name of the stored item
 * @return {Promise<void>} - Returns nothing
 */
export async function showValueFor(key: string) : Promise<void>{
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      alert("🔐 Here's your value 🔐 \n" + result);
    } else {
      alert("No values stored under that key.");
    }
  }
  
