import { transact, Account } from "@solana-mobile/mobile-wallet-adapter-protocol";
import { save } from "../secure-store/secureStore";
import { encryptJSON } from "../secure-store/crypto";
export default async function connectWallet(): Promise<Creds> {
  try {
    console.log("transact");

    // Perform a transaction using a mobile wallet
    const auth: Creds = await transact(async (mobileWallet) => {


      const authorization = await mobileWallet.authorize({
        cluster: "devnet",
        identity: { name: "Ascend", icon:"chad-icon.jpg" },
      });

      console.log(authorization)
      // If authorization fails, throw an error
      if (!authorization) throw new Error("Authorization failed");

      // Save the authorization token and encrypted accounts
      save("sol-auth", authorization.auth_token);
      let encryptedAccounts = encryptJSON(authorization.accounts);
      if (encryptedAccounts) save("sol-creds", encryptedAccounts);

      return { authToken: authorization.auth_token, account: authorization.accounts[0] };
    });
    return auth;
  } catch (error) {
    return Promise.reject(error);
  }
}
