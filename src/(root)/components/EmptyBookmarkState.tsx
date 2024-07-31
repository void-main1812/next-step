import { View, Text } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { height } from 'utils/Size';
import { Ionicons } from '@expo/vector-icons';
import { typographyStyles } from 'styles/typography';
import { spacing } from 'styles/spacing';

const EmptyBookmarkState = () => {
  const { theme, styles } = useStyles(styleSheet);

  return (
    <View style={styles.container}>
      <View style={styles.bookmarkIconBackground}>
        <Ionicons
          name="bookmark"
          size={height(15)}
          color={theme.components.Input.placeholderColor}
        />
      </View>
      <Text
        style={[
          typographyStyles(theme).heading_2,
          { color: theme.components.Input.placeholderColor },
        ]}>
        No Bookmarks Found
      </Text>
    </View>
  );
};

export default EmptyBookmarkState;

const styleSheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.components.Background.color,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.height[10],
  },

  bookmarkIconBackground: {
    backgroundColor: theme.components.Input.backgroundColor,
    height: height(30),
    width: height(30),
    borderRadius: height(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
