import React, { useCallback, useState } from "react";
import { MainButton } from "../Buttons";
import connectWallet from "../../lib/solana/connectWallet";
import useStore from "../../lib/state";
import { Text, View } from "react-native";

export default function ConnectButton({ onConnected }: { onConnected: (address: string) => void }) {

  const [connexionState, setConnexionState] = useState<"Not connected" | "Loading" | "Connected">("Not connected");
  const [resp, setResp] = useState<Creds>();

  function onConnect() {
    async function _connect() {
      try {
        if (connexionState == "Loading") return;
        setConnexionState("Loading")
        const resp = await connectWallet();
        if (resp) {
          setResp(resp);
          onConnected(resp.account?.address!)
        }
      } catch (err: any) {
        console.log(err);
      } finally {
        setConnexionState("Connected")
      }
    }
    _connect();
  }

  return (
    <View className="flex flex-col items-center">
      <Text className="text-white">{resp ? resp?.account?.address : "resp not defined"}</Text>
      <Text className="text-white">{resp ? resp.authToken : "resp not defined"}</Text>
      <MainButton text="Connect wallet" onPress={onConnect} disabled={connexionState == "Loading"} />
    </View>
  );
}
