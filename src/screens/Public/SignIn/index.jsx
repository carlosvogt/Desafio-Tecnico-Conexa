import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Title1, Title2 } from '@components/typography';
import { View, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { useTheme } from '@theme';
import { Logo } from '@assets';
import { useToast } from '@components';
import SignInForm from './SignInForm';

function SignIn() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const toast = useToast();

  const styles = StyleSheet.create({
    scrollView: {
      flexGrow: 1,
      padding: 16,
    },
    viewTitle: {
      marginBottom: 30,
      color: colors.secondary,
    },
    iconContainer: {
      width: '100%',
      marginBottom: 70,
      marginTop: 16,
      alignItems: 'center',
    },
  });

  const handleLoginData = async (user) => {
    await AsyncStorage.setItem('user', JSON.stringify(user));
    dispatch({
      type: 'SIGN_IN',
      payload: user,
    });
  };

  const handleLogin = (login) => {
    setLoading(true);
    fetch('http://desafio.conexasaude.com.br/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: login.email,
        senha: login.password,
      }),
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
          handleLoginData(response);
        }
      });
    setLoading(false);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.iconContainer}>
        <Logo />
      </View>
      <View style={styles.viewTitle}>
        <Title1 color={colors.secondary} centered family="medium">
          {t('login:welcome')}
        </Title1>
        <Title2 color={colors.secondary} centered family="medium">
          {t('login:makeLogin')}
        </Title2>
      </View>

      <SignInForm
        onSubmit={(values) => handleLogin(values)}
        isSubmitting={loading}
      />
    </ScrollView>
  );
}
export default SignIn;
