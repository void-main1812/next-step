import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Home from './home';
import HomeScreen from './home';

export type RootStackParamList = {
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ animation: 'slide_from_right', animationDuration: 50 }}
      initialRouteName="Home">
        <Stack.Screen name='Home' component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
