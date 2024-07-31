import { useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { SplashScreenAnimation } from 'animations/SplashScreenAnimation';
import Container from 'components/Container';
import React, { useEffect } from 'react';
import { ActivityIndicator, Text } from 'react-native';
import Animated from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { spacing } from 'styles/spacing';
import { typographyStyles } from 'styles/typography';
import { height } from 'utils/Size';

const Splash = ({ navigation }: any) => {
  const { userId, sessionId } = useAuth();

  useEffect(() => {
    const navigateToHome = setTimeout(() => {
      if (userId && sessionId) {
        navigation.replace('RootNavigator');
        return;
      }
      navigation.replace('Auth');
    }, 5000);
    return () => clearTimeout(navigateToHome);
  });

  const { animatedLogo, animatedText, animatedLogoBackground, animatedLoadingContainer } =
    SplashScreenAnimation();

  const { theme, styles } = useStyles(StyleSheet);

  return (
    <>
      <Container statusBarColor="transparent">
        <Animated.View sharedTransitionTag="titleContainer01" style={styles.container}>
          <Animated.View
            sharedTransitionTag="logoContainer01"
            style={[styles.logoContainer, animatedLogoBackground]}>
            <Animated.View style={animatedLogo}>
              <Ionicons
                name="briefcase"
                size={height(6)}
                style={{ transform: [{ rotateZ: '-10deg' }] }}
                color={theme.components.Icons.normal.color}
              />
            </Animated.View>
          </Animated.View>
          <Animated.Text
            sharedTransitionTag="logoText01"
            style={[typographyStyles(theme).heading_2, animatedText]}>
            Next Step
          </Animated.Text>
        </Animated.View>
        <Animated.View style={[styles.loadingContainer, animatedLoadingContainer]}>
          <ActivityIndicator size="small" color={theme.components.Icons.normal.color} />
          <Text style={typographyStyles(theme).special}>Loading...</Text>
        </Animated.View>
      </Container>
    </>
  );
};

export default Splash;

const StyleSheet = createStyleSheet((theme) => ({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: height(2),
  },
  logoContainer: {
    height: height(10),
    width: height(10),
    borderRadius: spacing.height[2],
    backgroundColor: theme.components.Icons.normal.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    position: 'absolute',
    bottom: height(10),
    paddingHorizontal: height(4),
    paddingVertical: height(2),
    backgroundColor: theme.components.LoadingBar.backgroundColor,
    borderRadius: spacing.height[10],
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: height(2),
  },
}));
