import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Login from './login';

export type RootStackParamList = {
  Login: undefined;
  SignUpOptions: undefined;
  Signup: undefined;
  RapidApi: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}
      initialRouteName="Login">
      <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
