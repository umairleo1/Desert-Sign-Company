import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={16}
      height={14}
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.707 13.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L3.414 6H15a1 1 0 110 2H3.414l4.293 4.293a1 1 0 010 1.414z"
        fill="#000"
      />
    </Svg>
  );
}

export default SvgComponent;
