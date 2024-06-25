import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from '~/Auth';
import Loading from '~/Loading';

export type RootStackParamList = {
  Auth: undefined;
  Loading: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter }}
        initialRouteName="Loading">
        <Stack.Screen options={{ headerShown: false }} name="Auth" component={AuthNavigator} />
        <Stack.Screen options={{ headerShown: false }} name="Loading" component={Loading} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
