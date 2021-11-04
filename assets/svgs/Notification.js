import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={19}
      height={20}
      viewBox="0 0 19 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 2.5a5 5 0 00-5 5v4.167c0 .59-.156 1.164-.447 1.667h10.894A3.334 3.334 0 0115 11.667V7.5a5 5 0 00-5-5zm8.333 10.834a1.666 1.666 0 01-1.666-1.667V7.5a6.667 6.667 0 00-13.334 0v4.167a1.666 1.666 0 01-1.666 1.667.833.833 0 100 1.666h16.666v-1.666zM8.14 16.779a.833.833 0 011.14.303.834.834 0 001.44 0 .833.833 0 111.442.836 2.5 2.5 0 01-4.324 0 .833.833 0 01.302-1.139z"
        fill="#071440"
      />
    </Svg>
  );
}

export default SvgComponent;
