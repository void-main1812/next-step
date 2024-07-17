import { useOAuth } from '@clerk/clerk-expo';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { height } from 'utils/Size';

// creating a browser warm-up function to avoid delay
export const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

type SocialAuthButtonProps = {
  icon: any;
  provider: 'oauth_google' | 'oauth_facebook' | 'oauth_github';
};

const SocialAuthButton = ({ icon, provider }: SocialAuthButtonProps) => {
  // handling loading state
  const [loading, setLoading] = useState(false);

  // warming up the browser to avoid delay
  useWarmUpBrowser();

  // importing the startOAuthFlow function from the useOAuth hook and passing the provider
  const { startOAuthFlow } = useOAuth({ strategy: provider });
  // getting the styles and theme from the useStyles hook
  const { styles, theme } = useStyles(styleSheet);

  // handling the onPress event
  const onPress = React.useCallback(async () => {
    setLoading(true);
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/Home'),
      });

      if (createdSessionId) {
        setLoading(false);
        setActive!({ session: createdSessionId });
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  }, []);

  // rendering the button
  return (
    <Pressable onPress={onPress} style={styles.container}>
      {loading ? (
        <ActivityIndicator size={'large'} color={theme.components.Text.title} />
      ) : (
        <Image source={icon} style={styles.container} resizeMode="contain" />
      )}
    </Pressable>
  );
};

const styleSheet = createStyleSheet((theme) => ({
  container: {
    height: height(4),
    width: height(4),
  },
}));

export default SocialAuthButton;
