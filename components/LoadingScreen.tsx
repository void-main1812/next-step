import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import Container from './Container';

const LoadingScreen = () => {
  const { theme, styles } = useStyles(styleSheet);

  return (
    <Container statusBarColor="transparent">
      <View style={styles.Container}>
        <ActivityIndicator size="small" color={theme.components.Icons.normal.color} />
      </View>
    </Container>
  );
};

export default LoadingScreen;

const styleSheet = createStyleSheet((theme) => ({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
