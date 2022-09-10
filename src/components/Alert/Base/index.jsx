import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { useTimeout } from '../../../hooks';
import { Title3 } from '../../typography';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginVertical: 10,
  },
});

function BaseAlert({ bgColor, message, textColor, visible, autoHide, onHide }) {
  const { done } = useTimeout({
    timeout: 4000,
  });

  const shouldHide = (autoHide && done) || !visible;

  useEffect(() => {
    if (shouldHide) {
      onHide();
    }
  }, [shouldHide, onHide]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: bgColor,
          borderRadius: 20,
        },
      ]}
    >
      <View style={{ flex: 1 }}>
        <Title3 centered family="medium" color={textColor}>
          {message}
        </Title3>
      </View>
    </View>
  );
}

BaseAlert.propTypes = {
  message: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  visible: PropTypes.bool,
  autoHide: PropTypes.bool,
  onHide: PropTypes.func,
};

BaseAlert.defaultProps = {
  visible: true,
  autoHide: true,
  onHide: () => {},
};

export default BaseAlert;
