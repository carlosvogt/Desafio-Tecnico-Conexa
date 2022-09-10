import React from 'react';
import { useTheme } from '@theme';
import StyledText from '../StyledText';

function Title2({ underlined, color, children, ...rest }) {
  const { colors } = useTheme();

  return (
    <StyledText
      {...rest}
      lineHeight={35}
      letterSpacing={0.31}
      fontSize={30}
      color={color || colors.text}
      underlined={underlined}
    >
      {children}
    </StyledText>
  );
}

export default Title2;
