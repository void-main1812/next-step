import './styles/unistyles';

import 'react-native-gesture-handler';

import { ClerkLoaded, ClerkLoading, ClerkProvider } from '@clerk/clerk-expo';
import { useFonts } from 'expo-font';
import { ActivityIndicator, View } from 'react-native';
import { height, width } from 'utils/Size';
import { tokenCache } from 'utils/TokenCache';
import RootStack from './src/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import LottieView from 'lottie-react-native';
import { useRef } from 'react';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function App() {

  const animation = useRef<LottieView>(null);

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
    return (
      <View>
        <StatusBar style="light" hidden />
        <View
          style={{
            height: height(100),
            width: width(100),
            backgroundColor: '#000',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size={'large'} color={'#fff'} />
        </View>
      </View>
    );
  }


  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <StatusBar style="light" hidden />
      <ClerkLoading>
        <View
          style={{
            height: height(100),
            width: width(100),
            backgroundColor: '#000',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: 200,
              height: 200,
              backgroundColor: '#eee',
            }}
            // Find more Lottie files at https://lottiefiles.com/featured
            source={require('./animations/lottieAnimations/server.json')}
          />
        </View>
      </ClerkLoading>
      <ClerkLoaded>
        <RootStack />
      </ClerkLoaded>
    </ClerkProvider>
  );
}
