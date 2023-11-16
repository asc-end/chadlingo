import { Web3MobileWallet } from "@solana-mobile/mobile-wallet-adapter-protocol-web3js";
import { encryptJSON } from "../secure-store/crypto";
import { save } from "../secure-store/secureStore";
import { AppIdentity, AuthorizationResult} from "@solana-mobile/mobile-wallet-adapter-protocol";

export const APP_IDENTITY: AppIdentity = {
  name: "Ascend",
  uri: "https://yourdapp.com",
  icon: "./favicon.ico",
};

export async function authorize(
  mobileWallet: Web3MobileWallet,
  setSolanaCreds: (creds: Creds) => void,
  auth_token?: string
) : Promise<AuthorizationResult>{
  const authorizationResult: AuthorizationResult = await (auth_token
    ? mobileWallet.reauthorize({
        auth_token: auth_token,
        identity: APP_IDENTITY,
      })
    : mobileWallet.authorize({
        cluster: "devnet",
        identity: APP_IDENTITY,
      }));

  // If authorization fails, throw an error
  if (!authorizationResult) throw new Error("Authorization failed");
  
  // Save the authorization token and encrypted accounts
  let encryptedCreds = encryptJSON(authorizationResult);
  save("sol-creds", encryptedCreds!);
  setSolanaCreds(authorizationResult);
  return authorizationResult;
}
