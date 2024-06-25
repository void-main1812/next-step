import { View, Text, Image } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { height } from 'utils/Size';

const SocialAuthButton = ({ icon }: { icon: any }) => {
  const { styles } = useStyles(styleSheet);

  return (
    <View style={styles.container}>
      <Image source={icon} style={styles.container} resizeMode='contain' />
    </View>
  );
};

export default SocialAuthButton;

const styleSheet = createStyleSheet((theme) => ({
  container: {
    height: height(4),
    width: height(4),
  },
}));
