import { Web3MobileWallet } from "@solana-mobile/mobile-wallet-adapter-protocol-web3js";
import { encryptJSON } from "../secure-store/crypto";
import { save } from "../secure-store/secureStore";

export async function authorize(
  mobileWallet: Web3MobileWallet,
  solanaCreds: Creds,
  setSolanaCreds: (creds: Creds) => void
) {
  let authorization;
  let error = null;
  if (solanaCreds.auth_token) {
    authorization = await mobileWallet
      .reauthorize({
        auth_token: solanaCreds.auth_token,
        identity: { name: "Ascend" },
      })
      .catch((e) => (error = e));
  }
  if (!solanaCreds.auth_token || error) {
    authorization = await mobileWallet.authorize({
      cluster: "devnet",
      identity: { name: "Ascend" },
    });
  }
  console.log(authorization);
  let encryptedCreds = encryptJSON(authorization);
  save("sol-creds", encryptedCreds!);
  setSolanaCreds(authorization);
}
