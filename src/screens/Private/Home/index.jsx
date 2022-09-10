import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View, StyleSheet, RefreshControl } from 'react-native';
import { Logo } from '@assets';
import { Button, ScheduleItem, Modal, useToast } from '@components';
import { Title1, Title3 } from '@components/typography';
import { useTheme } from '@theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

function Home() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [queries, setQueries] = useState([]);
  const token = useSelector((state) => state?.auth?.user?.data?.token);
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('info');
  const [refreshing, setRefreshing] = useState(false);
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
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
    },

    footerContainer: {
      flexDirection: 'row',
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: colors.gray,
      justifyContent: 'space-between',
    },
    bodyContainer: {
      flex: 1,
      height: '100%',
    },
    text: {
      marginBottom: 32,
    },
    button: { width: 'auto' },
  });

  const handleGetData = () => {
    fetch('http://desafio.conexasaude.com.br/api/consultas', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.errorCode === '401') {
          toast.error(t('home:error401'));
        } else if (response.errorCode === '403') {
          toast.error(t('home:error403'));
        } else if (response.errorCode === '404') {
          toast.error(t('home:error404'));
        } else {
          setQueries(response.data);
        }
      });
  };

  useEffect(() => {
    handleGetData();
  }, []);

  const signOut = async () => {
    setShowModal(false);
    await AsyncStorage.removeItem('user');
    dispatch({
      type: 'SIGN_OUT',
    });
  };

  const handleMeet = (item) => {
    navigation.navigate('Meet', item);
  };

  const handleNewQuery = () => {
    navigation.navigate('NewQuery');
  };

  const dismissModal = () => {
    setShowModal(false);
    setModalType('info');
  };

  function onRefresh() {
    setRefreshing(true);
    handleGetData();
    setRefreshing(false);
  }

  return (
    <View style={styles.container}>
      <Modal
        title={modalType === 'info' ? t('home:help') : t('home:attention')}
        showModal={showModal}
        cancelText={t('home:cancel')}
        cancelFunction={() => dismissModal()}
        description={
          modalType === 'info' ? t('home:helpText') : t('home:description')
        }
        confirmText={modalType === 'info' ? t('home:ok') : t('home:goOut')}
        confirmFunction={() =>
          modalType === 'info' ? dismissModal() : signOut()
        }
        mode={modalType}
      />

      <View style={styles.headerContainer}>
        <Logo />
        <Button
          style={styles.button}
          mode="outlined"
          title={t('home:signOut')}
          onPress={() => {
            setModalType('question');
            setShowModal(true);
          }}
        />
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.bodyContainer}>
          <View style={styles.text}>
            <Title1 family="medium" color={colors.primary} centered>
              {t('home:queries')}
            </Title1>

            <Title3 family="medium" color={colors.darkGray} centered>
              {`${queries.length} ${t('home:qtdQueries')}`}
            </Title3>
          </View>
          {queries.map((item) => {
            return (
              <ScheduleItem
                data={item}
                key={item.id}
                handleMeet={() => handleMeet(item)}
              />
            );
          })}
        </View>
      </ScrollView>
      <View style={styles.footerContainer}>
        <Button
          style={styles.button}
          mode="outlined"
          title={t('home:help')}
          onPress={() => {
            setModalType('info');
            setShowModal(true);
          }}
        />
        <Button
          title={t('home:scheduleQuery')}
          onPress={handleNewQuery}
          style={styles.button}
        />
      </View>
    </View>
  );
}
export default Home;
