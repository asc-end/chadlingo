import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { useEffect, useState } from "react"
import { View } from "react-native"

export default function Avatar({ size }: { size: "medium" | "large" | "small" }) {

    function initializeWidth() {
        if (size === "large")
            return 144
        if (size === "medium")
            return 72
        if (size === "small")
            return 28
    }
    const [width, setWidth] = useState(initializeWidth())

    return (
        <View className={`bg-cyan-400/20 rounded-full border border-cyan-400 flex items-center justify-center`} style={{ width: width, height: width }}>
            <MaterialCommunityIcons name="account" size={width! / 3 * 2} color="#FFFFFF43" />
        </View>
    )
}
