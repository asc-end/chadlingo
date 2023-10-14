import React from "react";
import { View, Text, Pressable } from "react-native";
import ConnectButton from "../../components/solana/ConnectButton";
import useStore from "../../lib/state";
import setNewUser from "../../lib/firebase/setNewUser";

export default function ConnectWallet(){
    const {updateFlow} = useStore()

    function onConnected(address: string){
        setNewUser(address)
        updateFlow("beginChallenge_welcome")
    }
    
    return(
        <View className="flex flex-col items-center justify-center h-full">
            <Text className="text-white">You need to Connect your wallet first</Text>
            <ConnectButton onConnected={onConnected}/>
        </View>
    )
}