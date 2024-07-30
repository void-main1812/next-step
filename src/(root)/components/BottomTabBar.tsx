import { BlurView } from 'expo-blur';
import React from 'react';
import { StyleSheet } from 'react-native';
import { UnistylesRuntime, useStyles } from 'react-native-unistyles';

const BottomTabBar = () => {
  const { theme } = useStyles();

  const appTheme = UnistylesRuntime.themeName;

  return (
    <BlurView
      style={[
        StyleSheet.absoluteFill,
        {
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
        },
      ]}
      intensity={65}
      tint={appTheme}
      experimentalBlurMethod="dimezisBlurView"></BlurView>
  );
};

export default BottomTabBar;
