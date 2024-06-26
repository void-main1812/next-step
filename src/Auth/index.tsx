import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Login from './login';
import SignUpOptions from './signup';

export type RootStackParamList = {
  Login: undefined;
  SignUpOptions: undefined;
  Signup: undefined;
  RapidApi: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ animation: 'slide_from_right', animationDuration: 50 }}
      initialRouteName="Login">
      <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
      <Stack.Screen
        name="SignUpOptions"
        options={{ headerShown: false }}
        component={SignUpOptions}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
