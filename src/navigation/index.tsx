import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from '~/Auth';
import Loading from '~/Loading';

export type RootStackParamList = {
  Auth: undefined;
  Loading: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ animation: 'fade' }} initialRouteName="Loading">
        <Stack.Screen options={{ headerShown: false }} name="Auth" component={AuthNavigator} />
        <Stack.Screen options={{ headerShown: false }} name="Loading" component={Loading} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
