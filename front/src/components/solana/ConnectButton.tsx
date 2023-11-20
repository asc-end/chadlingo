import React, { useState } from "react";
import { PrimaryButton } from "../buttons/";
import setNewUser from "../../lib/firebase/setNewUser";
import getUserKey from "../../lib/firebase/getUserKey";
import { transact } from "@solana-mobile/mobile-wallet-adapter-protocol-web3js";
import { authorize } from "../../lib/solana/authorize";
import { useSolana } from "../../providers/SolanaProvider";

export default function ConnectButton({
  text = "Connect Wallet",
}: {
  text?: string;
}) {
  const { setSolanaCreds, connexionState, setConnexionState } = useSolana()

  function onConnect() {
    async function _connect() {
      try {
        if (connexionState == "connecting") return;
        setConnexionState("connecting");
        let authResult = await transact(async (mobileWallet) => {
          return await authorize(mobileWallet, setSolanaCreds);
        });
        if (authResult?.accounts[0]?.address) {
          let userKey = await getUserKey(authResult.accounts[0].address)
          if (!userKey)
            setNewUser(authResult.accounts[0].address)
        }
      } catch (err: any) {
        console.log(err);
      } finally {
        setConnexionState("connected");
      }
    }
    _connect();
  }

  return <PrimaryButton text={text} onPress={onConnect} disabled={connexionState == "connecting"} full />;
}