import { useEffect } from 'react';
import {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useStyles } from 'react-native-unistyles';

export const SplashScreenAnimation = () => {
  const { theme } = useStyles();

  const logoTransformY = useSharedValue(0);
  const logoScale = useSharedValue(0.5);
  const LogoBackgroundColor = useSharedValue('transparent');
  const logoOpacity = useSharedValue(0);
  const TextTransformY = useSharedValue(25);
  const TextOpacity = useSharedValue(0);
  const LoadingContainerTransformY = useSharedValue(50);
  const LoadingContainerOpacity = useSharedValue(0);
  const LoadingContainerScale = useSharedValue(0.5);

  const animatedLogo = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: logoTransformY.value }, { scale: logoScale.value }],
      opacity: logoOpacity.value,
    };
  });

  const animatedLogoBackground = useAnimatedStyle(() => {
    return {
      backgroundColor: LogoBackgroundColor.value,
    };
  });

  const animatedText = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: TextTransformY.value }],
      opacity: TextOpacity.value,
    };
  });

  const animatedLoadingContainer = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: LoadingContainerTransformY.value },
        { scale: LoadingContainerScale.value },
      ],
      opacity: LoadingContainerOpacity.value,
    };
  });

  useEffect(() => {
    logoOpacity.value = withTiming(1, { duration: 500 });
  });

  useEffect(() => {
    const largeLogoTimeout = setTimeout(() => {
      logoScale.value = withTiming(1.2, { duration: 500 });
      logoTransformY.value = withTiming(-100, {
        duration: 500,
        easing: Easing.bezier(0.9, 0.21, 0.86, 0.63),
        reduceMotion: ReduceMotion.System,
      });
    }, 800);

    return () => clearTimeout(largeLogoTimeout);
  });

  useEffect(() => {
    const normalLogoTimeout = setTimeout(() => {
      logoScale.value = withTiming(1, {
        duration: 50,
        easing: Easing.bezier(0.55, 0.55, 0.55, 0.55),
        reduceMotion: ReduceMotion.System,
      });
      logoTransformY.value = withTiming(0, {
        duration: 50,
        easing: Easing.bezier(0.55, 0.55, 0.55, 0.55),
        reduceMotion: ReduceMotion.System,
      });
    }, 1500);

    return () => clearTimeout(normalLogoTimeout);
  });

  useEffect(() => {
    const AnimateTextTimout = setTimeout(() => {
      TextOpacity.value = withTiming(1, { duration: 200 });
      TextTransformY.value = withTiming(0, {
        duration: 500,
        easing: Easing.elastic(4),
        reduceMotion: ReduceMotion.System,
      });
      LogoBackgroundColor.value = theme.components.Icons.normal.background;
    }, 1550);

    return () => clearTimeout(AnimateTextTimout);
  });

  useEffect(() => {
    const logoContainerTimeout = setTimeout(() => {
      LoadingContainerOpacity.value = withTiming(1, { duration: 500 });
      LoadingContainerTransformY.value = withTiming(0, { duration: 500 });
      LoadingContainerScale.value = withTiming(1, { duration: 500 });
    }, 1800);

    return () => clearTimeout(logoContainerTimeout);
  });

  return { animatedLogo, animatedText, animatedLogoBackground, animatedLoadingContainer };
};
