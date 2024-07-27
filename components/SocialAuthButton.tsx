import { useAuth } from '@clerk/clerk-expo';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect } from 'react';
import { ActivityIndicator, Image, Pressable } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { height } from 'utils/Size';
import useSocialAuth from 'hooks/authHooks/useSocialAuth';
import Button from './Button';

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
  text?: string;
};

export const SocialAuthButtonCompact = ({ icon, provider }: SocialAuthButtonProps) => {
  useWarmUpBrowser();

  const { styles, theme } = useStyles(styleSheet);
  const { loading, onPress } = useSocialAuth({ provider });

  return (
    <Pressable onPress={onPress} style={styles.container}>
      {loading ? (
        <ActivityIndicator size={'large'} color={theme.components.Text.title} />
      ) : (
        icon && <Image source={icon} style={styles.container} resizeMode="contain" />
      )}
    </Pressable>
  );
};

export const SocialAuthButtonWide = ({ icon, provider, text }: SocialAuthButtonProps) => {
  const { loading, onPress } = useSocialAuth({ provider });

  const { theme } = useStyles();

  return (
    <>
      {loading ? (
        <ActivityIndicator size={'large'} color={theme.components.Text.title} />
      ) : (
        <Button text={text} leftIcon={icon} variant="secondary" onPress={onPress} size="full" />
      )}
    </>
  );
};

const styleSheet = createStyleSheet(() => ({
  container: {
    height: height(4),
    width: height(4),
    borderRadius: height(4),
  },
}));
