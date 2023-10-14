import React from "react";
import { View, Dimensions} from "react-native";
import Svg, { Circle } from 'react-native-svg';

export default function CirclesInCircle({nbDone=0, current=0}: {nbDone?: number, current?: number}){
    const numCircles = 30;
    const radius = 130;
    const { width, height } = Dimensions.get('window');
    const centerX = width / 2;
    const centerY = height / 2;
  
    const circles:any[] = [];
    const startAngle = -Math.PI / 2;

    for (let i = 0; i < numCircles; i++) {
      const angle = startAngle + (i / numCircles) * 2 * Math.PI;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
  
      circles.push(
        <Circle
          key={i}
          cx={x}
          cy={y}
          r={10}
          fill={nbDone > i ? "blue" :"gray"}
          stroke={current == i ? "#00FFFF": ""}
          strokeWidth={current == i ? 2: 0}
        />
      );
    }
  
    return (
      <View className="flex items-center justify-center">
        <Svg width={width} height={height}>
          {circles}
        </Svg>
      </View>
    );
  
}