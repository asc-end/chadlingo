import React from "react";
import { View, Dimensions } from "react-native";
import Svg, { Circle } from 'react-native-svg';

export default function CirclesInCircle({ nbDone = 0, current = 50, percentage = 0 }: { nbDone?: number, current?: number, percentage?: number }) {
  const numCircles = 30;
  const radius = 160;
  const { width, height } = Dimensions.get('window');
  const centerX = width / 2;
  const centerY = height / 2;

  const circles: any[] = [];
  const startAngle = -Math.PI / 2;

  circles.push(
    <Circle
      key={numCircles}
      cx={centerX}
      cy={centerY}
      r={radius - 20}
      stroke="#0000FF23"
      strokeWidth={40}
    // strokeDasharray={strokeDasharray}
    />
  );

  for (let i = 0; i < numCircles; i++) {
    const angle = startAngle + (i / numCircles) * 2 * Math.PI;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    if (current === i) {
      circles.push(
        <Circle key={i + "-shadow"}
          cx={x}
          cy={y}
          r={12}
          fill={"#00FFFF85"}
        />)
        circles.push(
          <Circle key={i + "-shadow-2"}
            cx={x}
            cy={y}
            r={14}
            fill={"#00FFFF25"}
          />)
    }

    circles.push(
      <Circle
        key={i}
        cx={x}
        cy={y}
        r={10}
        fill={nbDone > i ? "#5100FF" : "#000096"}
        stroke={current == i ? "#00FFFF" : ""}
        strokeWidth={current == i ? 1 : 0}
      />
    );

  }

  // Add a circle with stroke equal to the percentage
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${circumference * percentage / 100} ${circumference}`;

  circles.push(
    <Circle
      key={numCircles + 1}
      cx={centerX}
      cy={centerY}
      r={radius - 30}
      stroke="#0000FFAA"
      strokeWidth={15}
      strokeDasharray={strokeDasharray}
    />
  );

  return (
    <View className="flex items-center justify-center">
      <Svg width={width} height={height}>
        {circles}
      </Svg>
    </View>
  );

}