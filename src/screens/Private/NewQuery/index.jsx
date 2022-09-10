import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Logo } from '@assets';
import { Title2 } from '@components/typography';
import { useTheme } from '@theme';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useToast } from '@components';
import NewQueryForm from './NewQueryForm';

function NewQuery() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const token = useSelector((state) => state?.auth?.user?.data?.token);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const toast = useToast();

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
    title: {
      marginBottom: 32,
    },
  });

  const handleNewQuery = (form) => {
    const date = form.date.split('/');
    const dateTime = `${date[2]}-${date[1]}-${date[0]}T${form.hour}`;
    setLoading(true);
    fetch('http://desafio.conexasaude.com.br/api/consulta', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        dataConsulta: dateTime,
        idMedico: 0,
        observacao: form.observation,
        paciente: form.name,
      }),
    })
      .then((resposta) => resposta.json())
      .then((response) => {
        if (response.errorCode === '500') {
          toast.error(t('newQuery:error500'));
        } else if (response.errorCode === '401') {
          toast.error(t('newQuery:error401'));
        } else if (response.errorCode === '403') {
          toast.error(t('newQuery:error403'));
        } else if (response.errorCode === '404') {
          toast.error(t('newQuery:error404'));
        } else {
          toast.success(t('newQuery:success'));
          navigation.goBack();
        }
      });

    setLoading(false);
  };

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
            {t('newQuery:newQuery')}
          </Title2>
        </View>

        <NewQueryForm
          onSubmit={(values) => handleNewQuery(values)}
          isSubmitting={loading}
        />
      </ScrollView>
    </View>
  );
}
export default NewQuery;
