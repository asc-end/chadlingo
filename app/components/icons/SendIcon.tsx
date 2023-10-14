import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SendIcon = ({ size = 20, color="#000" }: { size: number, color?:string }) => (
  <Svg fill="none" width={size} height={size} viewBox="0 0 512 512">
    <Path
      fill={color}
      d="m476.59 227.05-.16-.07L49.35 49.84A23.56 23.56 0 0 0 27.14 52 24.65 24.65 0 0 0 16 72.59v113.29a24 24 0 0 0 19.52 23.57l232.93 43.07a4.005 4.005 0 0 1 3.255 3.93 4.003 4.003 0 0 1-3.255 3.93L35.53 303.45A23.998 23.998 0 0 0 16 327v113.31A23.572 23.572 0 0 0 26.59 460a23.945 23.945 0 0 0 13.22 4 24.552 24.552 0 0 0 9.52-1.93L476.4 285.94l.19-.09a31.993 31.993 0 0 0 19.365-29.4 31.997 31.997 0 0 0-19.365-29.4Z"
    />
  </Svg>
);
export default SendIcon;
