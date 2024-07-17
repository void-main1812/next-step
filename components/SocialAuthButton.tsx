import { useOAuth } from '@clerk/clerk-expo';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect } from 'react';
import { Image, Pressable } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { height } from 'utils/Size';

export const useWarmUpBrowser = () => {
  useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
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
}

const SocialAuthButton = ({ icon, provider }: SocialAuthButtonProps) => {

  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: provider });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  }, []);

  const { styles } = useStyles(styleSheet);

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image source={icon} style={styles.container} resizeMode="contain" />
    </Pressable>
  );
};

export default SocialAuthButton;

const styleSheet = createStyleSheet((theme) => ({
  container: {
    height: height(4),
    width: height(4),
  },
}));
