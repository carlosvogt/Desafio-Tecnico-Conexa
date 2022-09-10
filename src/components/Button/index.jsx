import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@theme';
import { Button as PaperButton } from '../third-party-components';
import Title3 from '../typography/Title3';

function Button({ onPress, title, mode, style, disabled, ...props }) {
  const { colors } = useTheme();

  const buttonStyle = {
    borderRadius: 10,
    backgroundColor: mode === 'outlined' ? colors.whiteBlue : colors.primary,
    borderWidth: mode === 'outlined' ? 2 : 0,
    borderColor: colors.primary,
  };

  const buttonContentStyle = {
    height: mode === 'outlined' ? 'auto' : 40,
  };

  if (disabled) {
    buttonStyle.opacity = 0.7;
  }

  return mode === 'outlined' ? (
    <PaperButton
      {...props}
      mode="contained"
      style={[buttonStyle, style]}
      contentStyle={buttonContentStyle}
      disabled={disabled}
      onPress={onPress}
    >
      <Title3 family="medium" color={colors.primary}>
        {title}
      </Title3>
    </PaperButton>
  ) : (
    <PaperButton
      {...props}
      mode="contained"
      style={[buttonStyle, style]}
      contentStyle={buttonContentStyle}
      disabled={disabled}
      onPress={onPress}
    >
      <Title3 family="medium" color={colors.background}>
        {title}
      </Title3>
    </PaperButton>
  );
}

Button.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string,
  mode: PropTypes.oneOf(['outlined', '']),
  style: PropTypes.object,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  onPress: () => {},
  title: '',
  mode: '',
  style: {},
  disabled: false,
};

export default Button;
