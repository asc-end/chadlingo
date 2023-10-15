import { useState } from "react"
import { Image } from "react-native"

export default function LanguageFlag({ code, size = "medium" }: { code: string, size?: "small" | "medium" | "large" }) {

    function initializeWidth() {
        if (size === "large")
            return 144
        if (size === "medium")
            return 48
        if (size === "small")
            return 28
    }
    const [width, setWidth] = useState(initializeWidth())


    return (
        <Image
            source={{ uri: `https://flagcdn.com/w160/${code}.png` }}
            alt="Ukraine"
            className="rounded-full"
            style={{ width: width, height: width }}
        />
    )
}

