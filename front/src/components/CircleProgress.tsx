import { Image, Text, View } from "react-native";
import { Circle, Svg } from "react-native-svg";

export default function CircleProgress({ size = 250, chrono }: { size?: number; chrono?: any | null }) {
  const center = size / 2;
  const stroke = 8;
  const radius = size / 2 - stroke / 2;
  const circles: any[] = [];
  const startAngle = -Math.PI / 2;
  return (
    <View className="flex flex-col items-center justify-center" style={{ height: size }}>
      <Svg width={size} height={size} className="">
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#0000ff"
          strokeWidth={stroke}
          fill={"#03196800"}
        // strokeDasharray={strokeDasharray}
        />
        {chrono && <Circle
          cx={center}
          cy={center}
          r={radius - 10}
          stroke="#0000ff44"
          strokeWidth={stroke}
          fill={"#03196849"}
        // strokeDasharray={strokeDasharray}
        />}
        {chrono && <Circle
          cx={center}
          cy={center}
          r={radius - 20}
          stroke="#0000ff44"
          strokeWidth={stroke + 10}
          fill={"#03196849"}
        // strokeDasharray={strokeDasharray}
        />}
      </Svg>
      {chrono && (
        <View
          className="flex flex-row justify-center items-center h-12 w-fit"
          style={{ transform: [{ translateY: -size / 2 - 24 }] }}>
          <Text
            className="text-white text-3xl w-16 text-right"
            style={{ fontFamily: "Orbitron_700Bold" }}>
            {`${chrono?.hours}`}
          </Text>
          <Text
            className="text-white text-3xl"
            style={{ fontFamily: "Orbitron_700Bold" }}>{`:${chrono?.minutes}:`}</Text>
          <Text className="text-white text-3xl w-16" style={{ fontFamily: "Orbitron_700Bold" }}>{`${chrono?.seconds}`}</Text>
        </View>
      )}
      {!chrono && <Image className="absolute rounded-full -z-10" source={{ uri: "https://media.discordapp.net/attachments/735519649277673572/1168744485451210864/IMG_00914.png?ex=6552e11f&is=65406c1f&hm=371b86bc354019c580e6f9ce572d98859aa3e8c8790dc0c07d302bc61be97b71&=&width=1048&height=1052" }} width={250} height={250} />}
    </View>
  );
}
