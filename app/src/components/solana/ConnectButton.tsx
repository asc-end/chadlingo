import React, { useCallback, useState } from "react";
import { MainButton } from "../Buttons";
import connectWallet from "../../lib/solana/connectWallet";
import useStore from "../../lib/state";
import { Text, View } from "react-native";

export default function ConnectButton({
  onConnected,
  text = "Connect Wallet",
}: {
  onConnected: (address: string) => void;
  text?: string;
}) {
  const [connexionState, setConnexionState] = useState<"Not connected" | "Loading" | "Connected">("Not connected");
  const [resp, setResp] = useState<Creds>();
  const { solanaCreds, setSolanaCreds } = useStore();

  function onConnect() {
    async function _connect() {
      try {
        if (connexionState == "Loading") return;
        setConnexionState("Loading");
        const resp = await connectWallet(setSolanaCreds);
        if (resp) {
          setResp(resp);
          onConnected(resp.accounts[0].address);
        }
      } catch (err: any) {
        console.log(err);
      } finally {
        setConnexionState("Connected");
      }
    }
    _connect();
  }

  return <MainButton text={text} onPress={onConnect} disabled={connexionState == "Loading"} full />;
}

// import React, { useCallback, useState } from "react";
// import { MainButton } from "../Buttons";
// import connectWallet from "../../lib/solana/connectWallet";
// import useStore from "../../lib/state";
// import { Text, View } from "react-native";
// import { useAuthorization } from "../../providers/AuthorizationProvider";
// import { transact } from "@solana-mobile/mobile-wallet-adapter-protocol";
// import { save } from "../../lib/secure-store/secureStore";

// export default function ConnectButton({ onConnected, text = "Connect Wallet" }: { onConnected: (address: string) => void, text?: string }) {

//   const [connexionState, setConnexionState] = useState<"Not connected" | "Loading" | "Connected">("Not connected");
//   const [resp, setResp] = useState<Creds>();
//   const { authorizeSession, selectedAccount } = useAuthorization();
//   const [authorizationInProgress, setAuthorizationInProgress] = useState(false);

//   const handleConnectPress = useCallback(async () => {
//     try {
//         if (authorizationInProgress) {
//             return;
//         }
//         setAuthorizationInProgress(true);
//         await transact(async wallet => {
//             await authorizeSession(wallet);
//         });
//         save("sol-auth", selectedAccount?.publicKey,)
//         onConnected(selectedAccount?.address!)

//     } catch (err: any) {
//         console.log(err)
//     } finally {
//         setAuthorizationInProgress(false);
//     }
// }, [authorizationInProgress, authorizeSession]);

//   return (
//     <MainButton text={text} onPress={handleConnectPress} disabled={authorizationInProgress} full/>
//   );
// }
