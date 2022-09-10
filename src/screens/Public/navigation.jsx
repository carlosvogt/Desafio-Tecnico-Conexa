import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '@theme';
import SignIn from './SignIn';

const Stack = createStackNavigator();

function PublicNavigator() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: colors.whiteBlue,
        },
      }}
    >
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
}

export default PublicNavigator;
