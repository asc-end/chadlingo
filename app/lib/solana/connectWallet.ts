import { transact, Account, MobileWallet } from "@solana-mobile/mobile-wallet-adapter-protocol";
import { save } from "../secure-store/secureStore";
import { encryptJSON } from "../secure-store/crypto";

export default async function connectWallet(setSolanaCreds: (newCreds: Creds) => void): Promise<Creds> {
  try {
    console.log("transact");

    // Perform a transaction using a mobile wallet
    const auth: Creds = await transact(async (mobileWallet) => {
      const authorization = await mobileWallet.authorize({
        cluster: "devnet",
        identity: { name: "Ascend", icon: "chad-icon.jpg" },
      });

      // If authorization fails, throw an error
      if (!authorization) throw new Error("Authorization failed");

      // Save the authorization token and encrypted accounts
      let encryptedCreds = encryptJSON(authorization);
      save("sol-creds", encryptedCreds!);
      setSolanaCreds(authorization);

      return authorization;
    });
    return auth;
  } catch (error) {
    return Promise.reject(error);
  }
}
