import './styles/unistyles';

import 'react-native-gesture-handler';

import RootStack from './src/navigation';
import { useFonts } from 'expo-font';
import { ClerkLoaded, ClerkProvider } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';

const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log('No values stored under key: ' + key);
      }
      return item;
    } catch (error) {
      console.error('SecureStore get item error: ', error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      console.error('SecureStore set item error: ', err);
      return;
    }
  },
};

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function App() {
  const [fontsLoaded] = useFonts({
    'ClashDisplay-Semibold': require('./assets/fonts/ClashDisplay-Semibold.otf'),
    'ClashDisplay-Medium': require('./assets/fonts/ClashDisplay-Medium.otf'),
    'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  if (!publishableKey) {
    throw new Error(
      'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env'
    );
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <RootStack />
      </ClerkLoaded>
    </ClerkProvider>
  );
}
