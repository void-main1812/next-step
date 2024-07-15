import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoadingScreen from 'components/LoadingScreen';
import { useFonts } from 'expo-font';
import HomeNavigator from '~/(home)';
import AuthNavigator from '~/Auth';
import Splash from '~/Splash';

export type RootStackParamList = {
  Auth: undefined;
  Loading: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
  const [isFontLoaded] = useFonts({
    'ClashDisplay-Semibold': require('../../assets/fonts/ClashDisplay-Semibold.otf'),
    'ClashDisplay-Medium': require('../../assets/fonts/ClashDisplay-Medium.otf'),
    'Montserrat-Medium': require('../../assets/fonts/Montserrat-Medium.otf'),
  });

  if (!isFontLoaded) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ animation: 'fade' }} initialRouteName="Loading">
        <Stack.Screen options={{ headerShown: false }} name="Auth" component={AuthNavigator} />
        <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeNavigator} />
        <Stack.Screen options={{ headerShown: false }} name="Loading" component={Splash} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
