import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PublicNavigator from '@screens/Public/navigation';
import PrivateNavigator from '@screens/Private/navigation';
import { useSelector } from 'react-redux';

function Routes() {
  const Stack = createStackNavigator();
  const token = useSelector((state) => state?.auth?.user?.data?.token);

  if (token) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="PrivateNavigator"
          component={PrivateNavigator}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  }
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PublicNavigator"
        component={PublicNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default Routes;
