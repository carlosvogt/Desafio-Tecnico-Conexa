import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Logo } from '@assets';
import { Title2, Title4 } from '@components/typography';
import { useTheme } from '@theme';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useToast } from '@components';

function Meet() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const params = useRoute();
  const { ...data } = params.params;
  const token = useSelector((state) => state?.auth?.user?.data?.token);
  const [details, setDetails] = useState();
  const toast = useToast();
  const [dateHour, setDateHour] = useState('');

  const handleDate = () => {
    const hourSplit = details?.dataConsulta?.split(' ');
    const dateSplit = hourSplit[0]?.split('-');
    setDateHour(
      `${dateSplit[2]}/${dateSplit[1]}/${dateSplit[0]} - ${hourSplit[1]}`,
    );
  };

  useEffect(() => {
    if (details) {
      handleDate();
    }
  }, [details]);

  const styles = StyleSheet.create({
    container: {
      height: '100%',
    },
    scrollView: {
      flexGrow: 1,
      paddingVertical: 32,
      paddingHorizontal: 16,
    },
    headerContainer: {
      borderBottomWidth: 1,
      borderBottomColor: colors.gray,
      paddingHorizontal: 16,
      width: '100%',
      height: 70,
      marginTop: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      marginVertical: 16,
    },
    title: {
      marginBottom: 32,
    },
    empty: {
      marginTop: 32,
    },
    doctor: {
      marginVertical: 32,
    },
  });

  useEffect(() => {
    fetch(`http://desafio.conexasaude.com.br/api/consulta/${data.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.errorCode === '401') {
          toast.error(t('meetDetails:error401'));
        } else if (response.errorCode === '403') {
          toast.error(t('meetDetails:error403'));
        } else if (response.errorCode === '404') {
          toast.error(t('meetDetails:error404'));
        } else {
          setDetails(response.data);
        }
      });
  }, []);

  if (!details) {
    return (
      <>
        <View style={styles.headerContainer}>
          <Logo />
        </View>
        <View style={styles.empty}>
          <Title2 family="medium" color={colors.primary} centered>
            {t('meetDetails:empty')}
          </Title2>
        </View>
      </>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Logo />
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.title}>
          <Title2 family="medium" color={colors.primary} centered>
            {t('meetDetails:details')}
          </Title2>
        </View>
        <View style={styles.text}>
          <Title4 family="medium" color={colors.primary}>
            {`${t('meetDetails:id')} ${details?.id}`}
          </Title4>
        </View>

        <View style={styles.text}>
          <Title4 family="medium" color={colors.primary}>
            {`${t('meetDetails:patient')} ${details?.paciente}`}
          </Title4>
        </View>

        <View style={styles.text}>
          <Title4 family="medium" color={colors.primary}>
            {`${t('meetDetails:dateTime')} ${dateHour}`}
          </Title4>
        </View>

        <View style={styles.text}>
          <Title4 family="medium" color={colors.primary}>
            {`${t('meetDetails:observation')} ${details?.observacao}`}
          </Title4>
        </View>

        <View style={styles.doctor}>
          <Title2 family="medium" color={colors.primary} centered>
            {t('meetDetails:doctorDetails')}
          </Title2>
        </View>
        <View style={styles.text}>
          <Title4 family="medium" color={colors.primary}>
            {`${t('meetDetails:doctor')} ${details?.medico?.nome}`}
          </Title4>
        </View>
        <View style={styles.text}>
          <Title4 family="medium" color={colors.primary}>
            {`${t('meetDetails:email')} ${
              details?.medico?.email || t('meetDetails:null')
            }`}
          </Title4>
        </View>
      </ScrollView>
    </View>
  );
}
export default Meet;
