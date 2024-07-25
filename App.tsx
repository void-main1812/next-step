import './styles/unistyles';

import 'react-native-gesture-handler';

import { ClerkLoaded, ClerkProvider } from '@clerk/clerk-expo';
import { useFonts } from 'expo-font';
import { ActivityIndicator } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { tokenCache } from 'utils/TokenCache';
import RootStack from './src/navigation';
import * as SplashScreen from 'expo-splash-screen'

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

SplashScreen.preventAutoHideAsync();

export default function App() {
  const { theme } = useStyles();
  
  const [fontsLoaded] = useFonts({
    'ClashDisplay-Semibold': require('./assets/fonts/ClashDisplay-Semibold.otf'),
    'ClashDisplay-Medium': require('./assets/fonts/ClashDisplay-Medium.otf'),
    'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.otf'),
  });

  if (!publishableKey) {
    throw new Error(
      'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env'
    );
  }

  if (!fontsLoaded) {
    return <ActivityIndicator size={'large'} color={theme.components.Text.title} />;
  }
  
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <RootStack />
      </ClerkLoaded>
    </ClerkProvider>
  );
}
