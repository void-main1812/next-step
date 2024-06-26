import { View, Text } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { typographyStyles } from 'styles/typography';

const Saperator = ({ text }: { text?: string }) => {
  const { styles } = useStyles(styleSheet);

  return (
    <View style={styles.Saperator}>{text && <Text style={styles.SaperatorText}>{text}</Text>}</View>
  );
};

export default Saperator;

const styleSheet = createStyleSheet((theme) => ({
  Saperator: {
    position: 'relative',
    width: '100%',
    height: 1,
    backgroundColor: theme.components.Saperator.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },

  SaperatorText: {
    ...typographyStyles(theme).body,
    backgroundColor: theme.components.Background.color,
    color: theme.components.Saperator.backgroundColor,
    padding: 10,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
