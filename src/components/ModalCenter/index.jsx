/* eslint-disable react/jsx-max-depth */
import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useTheme } from '@theme';
import PropTypes from 'prop-types';
import Button from '../Button';
import Title2 from '../typography/Title2';
import Title3 from '../typography/Title3';

const ModalCenter = ({
  title,
  description,
  confirmText,
  confirmFunction,
  cancelText,
  cancelFunction,
  showModal,
  mode,
}) => {
  const { colors } = useTheme();
  const deviceWidth = Dimensions.get('window').width;

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    modalBox: {
      width: deviceWidth - 32,
      backgroundColor: colors.whiteBlue,
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      padding: 16,
      borderRadius: 10,
    },
    question: {
      width: '100%',
      justifyContent: 'center',
      paddingBottom: 24,
      padding: 8,
    },
    noteContainer: {
      width: '100%',
      justifyContent: 'center',
      paddingBottom: 8,
    },
    buttonStyle: { width: 150 },
  });

  return (
    <Modal animationType="fade" transparent visible={showModal}>
      <TouchableWithoutFeedback onPress={cancelFunction}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.modalBox}>
              <View style={styles.question}>
                <Title2 color={colors.primary} family="medium" centered>
                  {title}
                </Title2>
              </View>
              <View style={styles.question}>
                <Title3 color={colors.primary} family="medium">
                  {description}
                </Title3>
              </View>
              {mode === 'question' && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <Button
                    title={cancelText}
                    onPress={cancelFunction}
                    mode="outlined"
                    textColor="red"
                    titleFamily="medium"
                  />
                  <Button
                    title={confirmText}
                    onPress={confirmFunction}
                    style={styles.buttonStyle}
                  />
                </View>
              )}
              {mode === 'info' && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Button
                    title={confirmText}
                    onPress={confirmFunction}
                    style={{ width: '100%' }}
                  />
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

ModalCenter.propTypes = {
  mode: PropTypes.oneOf(['info', 'question']),
};

ModalCenter.defaultProps = {
  mode: 'question',
};

export default ModalCenter;
