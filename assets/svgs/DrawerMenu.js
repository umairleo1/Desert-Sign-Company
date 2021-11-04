import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={14}
      height={12}
      viewBox="0 0 14 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 1a1 1 0 011-1h12a1 1 0 110 2H1a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H1a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 010 2H1a1 1 0 01-1-1z"
        fill="#000"
      />
    </Svg>
  );
}

export default SvgComponent;
