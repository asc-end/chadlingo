import { transact } from "@solana-mobile/mobile-wallet-adapter-protocol-web3js";
import { authorize } from "./authorize";

export default async function connect(setSolanaCreds: (creds: Creds) => void, auth_token?: string) {
  //Authorize session to the mobile wallet
  let authResult = await transact(async (mobileWallet) => {
    await authorize(mobileWallet, setSolanaCreds, auth_token);
  });
  return authResult;
}
