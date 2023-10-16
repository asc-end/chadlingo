import { useState } from "react";
import { View, TextInput, Pressable, Text } from "react-native";
import { useConnection } from "../../providers/ConnectionProvider";
import { getPublicKeyFromAddress } from "../../lib/solana/getPublicKeyFromAddress";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import useStore from "../../lib/state";

export default function SolAmountInput({amount, setAmount}: {amount: string, setAmount: React.Dispatch<React.SetStateAction<string>>}) {
  const [inputActive, setInputActive] = useState(false);
  const { connection } = useConnection();
  const {solanaCreds} = useStore()
  const updateAmount = (string: string) => {
    string = parseFloat(string).toFixed(7)
    if (/^[0-9]*(\.[0-9]{0,7})?$/.test(string) || string.length === 0) {
      setAmount(string);
    }    
  };
  return (
    <View
      className={`w-fit bg-black flex items-center justify-center px-1 py-1 rounded-md border-neutral-600 mb-15 flex-row border-2 border-transparent`}
      onPointerDown={() => setInputActive(!inputActive)}>
      <TextInput
        underlineColorAndroid="transparent"
        className={` border border-transparent w-40 text-white text-xl px-3 py-2 rounded-md focus:border-neutral-600 `}
        onChangeText={(e) => updateAmount(e)}
        value={amount}
        placeholderTextColor={"#505050"}
        placeholder={"Amount"}
        returnKeyType={"done"}
        keyboardType="numeric"
      />
      <Text className="m-2 text-slate-400">SOL</Text>
      <Pressable
        className=" "
        onPress={() => {
          (async () => {
            let pubKey = getPublicKeyFromAddress(solanaCreds?.account?.address!);
            let balance = await connection.getBalance(pubKey);
            balance /= LAMPORTS_PER_SOL;
            console.log(`${balance} SOL`);
            if (balance == 0) alert("You don't have any sol on this address");
            else updateAmount(balance.toString())
          })();
        }}>
        <Text className="m-2 color-white px-8 py-3 rounded-md font-bold bg-indigo-600">Max</Text>
      </Pressable>
    </View>
  );
}
