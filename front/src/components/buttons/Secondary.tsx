import { Pressable, View } from "react-native"
import { ReactNode } from "react";

export default function Secondary({ onPress, children, fade=true }: { onPress: () => void, children: ReactNode, fade?: boolean }) {
    function _onPress() {
      console.log("press")
      onPress()
    }
    return (
      <Pressable className="" onPressIn={() => _onPress()}>
        <View className={`h-full ${fade ? "bg-indigo-600/20" : "bg-indigo-600/80"}   px-3 py-2 rounded-md flex flex-row items-center w-fit`} style={{gap: 12}}>
          {children}
        </View>
      </Pressable>
  
  
    )
  }
  
  