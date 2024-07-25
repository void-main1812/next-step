import './styles/unistyles';

import 'react-native-gesture-handler';

import { ClerkLoaded, ClerkLoading, ClerkProvider } from '@clerk/clerk-expo';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import LottieView from 'lottie-react-native';
import { useRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { typographyStyles } from 'styles/typography';
import { height, width } from 'utils/Size';
import { tokenCache } from 'utils/TokenCache';
import RootStack from './src/navigation';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function App() {
  const animation = useRef<LottieView>(null);

  const { styles } = useStyles(styleSheet);

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
          style={styles.loadingContainer}>
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
          style={styles.loadingContainer}>
          <LottieView
            autoPlay
            ref={animation}
            style={styles.animation}
            source={require('./animations/lottieAnimations/server.json')}
          />
          <Text style={styles.loadingText}>Connecting to Server</Text>
        </View>
      </ClerkLoading>
      <ClerkLoaded>
        <RootStack />
      </ClerkLoaded>
    </ClerkProvider>
  );
}

const styleSheet = createStyleSheet((theme) => ({
  loadingContainer: {
    height: height(100),
    width: width(100),
    backgroundColor: '#000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 200,
    height: 200,
    backgroundColor: 'transparent'
  },
  loadingText: {
    ...typographyStyles(theme).heading_3,
    color: "#fff",
  }
}));