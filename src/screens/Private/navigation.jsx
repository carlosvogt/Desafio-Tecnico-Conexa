import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '@theme';
import Home from './Home';
import Meet from './Meet';
import NewQuery from './NewQuery';

const Stack = createStackNavigator();

function PrivateNavigator() {
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
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Meet" component={Meet} />
      <Stack.Screen name="NewQuery" component={NewQuery} />
    </Stack.Navigator>
  );
}

export default PrivateNavigator;
