import { View, Text, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import Container from 'components/Container';
import { typographyStyles } from 'styles/typography';
import { Ionicons } from '@expo/vector-icons';
import { spacing } from 'styles/spacing';
import { height } from 'utils/Size';
import { SplashScreenAnimation } from 'animations/SplashScreenAnimation';
import Animated from 'react-native-reanimated';

const Loading = ({ navigation }: any) => {
  useEffect(() => {
    const navigateToHome = setTimeout(() => {
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
        <View style={styles.container}>
          <Animated.View style={[styles.logoContainer, animatedLogoBackground]}>
            <Animated.View style={animatedLogo}>
              <Ionicons
                name="briefcase"
                size={height(6)}
                style={{ transform: [{ rotateZ: '-10deg' }] }}
                color={theme.components.Icons.normal.color}
              />
            </Animated.View>
          </Animated.View>
          <Animated.Text style={[typographyStyles(theme).heading_2, animatedText]}>
            Next Step
          </Animated.Text>
        </View>
        <Animated.View style={[styles.loadingContainer, animatedLoadingContainer]}>
          <ActivityIndicator size="small" color={theme.components.Icons.normal.color} />
          <Text style={typographyStyles(theme).special}>Loading...</Text>
        </Animated.View>
      </Container>
    </>
  );
};

export default Loading;

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
