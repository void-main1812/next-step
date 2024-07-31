import { View, Text } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { typographyStyles } from 'styles/typography';
import Button from 'components/Button';
import { spacing } from 'styles/spacing';

const DetailsRequiredMessage = () => {
  const { theme, styles } = useStyles(styleSheet);

  return (
    <View style={styles.detailsRequiredMessageContainer}>
      <Text style={typographyStyles(theme).heading_2}>Hey! Welcome</Text>
      <Text style={[typographyStyles(theme).body, { textAlign: 'center' }]}>
        We are glad that you are here. But to suggest you some jobs we first need to know about you.
        Press the button Below and fill your details.
      </Text>
      <View style={{ width: '100%' }}>
        <Button text="Fill your Details" size="full" />
      </View>
    </View>
  );
};

export default DetailsRequiredMessage;

const styleSheet = createStyleSheet((theme) => ({
  detailsRequiredMessageContainer: {
    width: '100%',
    padding: spacing.height[6],
    borderRadius: spacing.height[4],
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: theme.components.Text.heading_1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.height[6],
  },
}));
