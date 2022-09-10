import React, { useLayoutEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from '@navigation/index';
import { Provider, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'react-native';
import { useTheme } from '@theme';
import { ToastProvider } from '@components';
import store from './src/store';

function AppContents() {
  const dispatch = useDispatch();

  async function getStoreData() {
    try {
      const user = await AsyncStorage.getItem('user');
      const userInfo = JSON.parse(user);
      if (userInfo) {
        dispatch({
          type: 'SIGN_IN',
          payload: userInfo,
        });
      }
    } catch (e) {
      return e;
    }
    return null;
  }

  async function loadData() {
    await getStoreData();
  }

  useLayoutEffect(() => {
    loadData();
  }, []);

  return (
    <ToastProvider>
      <Navigation />
    </ToastProvider>
  );
}
const App = () => {
  const { colors } = useTheme();

  return (
    <Provider store={store}>
      <StatusBar backgroundColor={colors.whiteBlue} barStyle="dark-content" />

      <SafeAreaProvider>
        <AppContents />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
