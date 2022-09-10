import React from 'react';
import { useTheme } from '@theme';
import StyledText from '../StyledText';

function Title4({ underlined, color, children, ...rest }) {
  const { colors } = useTheme();

  return (
    <StyledText
      {...rest}
      lineHeight={20}
      letterSpacing={0.2}
      fontSize={20}
      color={color || colors.text}
      underlined={underlined}
    >
      {children}
    </StyledText>
  );
}

export default Title4;
