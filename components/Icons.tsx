import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { spacing } from 'styles/spacing';
import { height } from 'utils/Size';

// types for IconProps component
type IconProps = {
  name: keyof typeof Ionicons.glyphMap;
  variant?: 'normal' | 'success' | 'info' | 'danger' | 'warning';
  size?: 'small' | 'medium' | 'large';
  color?: string;
  showBackground?: boolean;
};

const Icons = ({
  name,
  variant = 'normal',
  size = 'medium',
  color,
  showBackground = false,
}: IconProps) => {
  // destructuring theme and styles from useStyles
  const { theme, styles } = useStyles(stylesheet, {
    size: size,
  });

  return (
    // View container for Icon
    <View
      style={[
        styles.container,
        {
          backgroundColor: showBackground
            ? theme.components.Icons[variant].background
            : 'transparent',
        },
      ]}>
      {/* Main icon component */}
      <Ionicons
        name={name}
        size={spacing.icons[size]}
        color={color || theme.components.Icons[variant].color}
      />
    </View>
  );
};

const stylesheet = createStyleSheet(() => ({
  container: {
    variants: {
      size: {
        small: {
          padding: spacing.height[2],
          borderRadius: spacing.height[1],
          height: height(4),
          width: height(4),
          justifyContent: 'center',
          alignItems: 'center',
        },
        medium: {
          padding: spacing.height[3],
          borderRadius: spacing.height[2],
          height: height(5),
          width: height(5),
          justifyContent: 'center',
          alignItems: 'center',
        },
        large: {
          padding: spacing.height[4],
          borderRadius: spacing.height[3],
          height: height(6),
          width: height(6),
          justifyContent: 'center',
          alignItems: 'center',
        },
      },
    },
  },
}));

export default Icons;
