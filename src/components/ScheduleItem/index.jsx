import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@theme';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import Title3 from '../typography/Title3';
import Title4 from '../typography/Title4';
import Button from '../Button';

function ScheduleItem({ data, handleMeet }) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [dateHour, setDateHour] = useState('');

  const handleDate = () => {
    const hourSplit = data?.dataConsulta?.split(' ');
    const dateSplit = hourSplit[0]?.split('-');
    setDateHour(
      `${dateSplit[2]}/${dateSplit[1]}/${dateSplit[0]} - ${hourSplit[1]}`,
    );
  };

  useEffect(() => {
    if (data) {
      handleDate();
    }
  }, [data]);

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: 80,
      backgroundColor: colors.whiteBlue,
      marginTop: 16,
      padding: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.darkGray,
      borderRadius: 10,
    },
    signOutButton: { width: 'auto' },
  });

  return (
    <View style={styles.container}>
      <View>
        <Title4 family="medium" color={colors.darkGray}>
          {data.paciente}
        </Title4>
        <Title3 color={colors.darkGray}>{dateHour}</Title3>
      </View>
      <View>
        <Button
          title={t('home:attend')}
          onPress={handleMeet}
          style={styles.signOutButton}
        />
      </View>
    </View>
  );
}

ScheduleItem.propTypes = {
  data: PropTypes.object,
};

ScheduleItem.defaultProps = {
  data: {},
};

export default ScheduleItem;
