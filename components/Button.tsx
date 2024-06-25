import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { typographyStyles } from 'styles/typography';
import { height } from 'utils/Size';

// types for the Button component props
type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'link' | 'danger';
  text?: string;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  size?: 'full' | 'normal' | 'icon';
  enableRipple?: boolean;
  longPressTimeout?: number;
  onLongPress?: () => void;
  disabled?: boolean;
};

const Button = ({
  variant = 'primary',
  text,
  rightIcon,
  leftIcon,
  onPress,
  size = 'normal',
  enableRipple = true,
  longPressTimeout = 500,
  onLongPress,
  disabled = false,
}: ButtonProps) => {
  // destructuring the theme and styles from the useStyles hook
  const { theme, styles } = useStyles(stylesheet, {
    color: variant,
    size: size,
    disabled: disabled,
  });

  // declaring the pressed style for all variants
  const buttonRippleStyle = {
    color: theme.components.Button[variant].rippleColor,
    radius: size! === 'full' ? 250 : 100,
  };

  const rippleEffect = enableRipple && !disabled ? buttonRippleStyle : undefined;

  return (
    <View style={styles.buttonContainer}>
      <Pressable
        onPress={onPress}
        style={styles.buttonBox}
        delayLongPress={longPressTimeout}
        onLongPress={onLongPress}
        android_ripple={rippleEffect}>
        {/* ANCHOR This is the left Icon */}
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={height(2.4)}
            color={theme.components.Button[variant].textColor}
          />
        )}
        {/* ANCHOR This is the text */}
        {text && <Text style={styles.text}>{text}</Text>}
        {/* ANCHOR This is the right Icon */}
        {rightIcon && (
          <Ionicons
            name={rightIcon}
            size={height(2.4)}
            color={theme.components.Button[variant].textColor}
          />
        )}
      </Pressable>
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  buttonContainer: {
    borderRadius: height(0.8),
    height: height(6),
    overflow: 'hidden',
    variants: {
      size: {
        full: {
          maxWidth: '100%',
          flex: 1,
        },
        normal: {
          maxWidth: undefined,
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'flex-start',
        },
        icon: {
          maxWidth: height(8),
        },
      },
      disabled: {
        true: {
          opacity: 0.5,
        },
        false: {
          opacity: 1,
        },
      },
    },
  },
  text: {
    ...typographyStyles(theme).special,
    variants: {
      color: {
        primary: {
          color: theme.components.Button.primary.textColor,
        },
        secondary: {
          color: theme.components.Button.secondary.textColor,
        },
        link: {
          color: theme.components.Button.link.textColor,
        },
        danger: {
          color: theme.components.Button.danger.textColor,
        },
      },
    },
  },
  buttonBox: {
    paddingHorizontal: height(2.4),
    height: '100%',
    borderWidth: 1,
    borderRadius: height(0.8),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
    flex: 0,
    gap: height(1.2),
    variants: {
      color: {
        primary: {
          backgroundColor: theme.components.Button.primary.background,
          color: theme.components.Button.primary.textColor,
          borderColor: 'transparent',
        },
        secondary: {
          backgroundColor: theme.components.Button.secondary.background,
          color: theme.components.Button.secondary.textColor,
          borderColor: 'transparent',
        },
        link: {
          backgroundColor: theme.components.Button.link.background,
          color: theme.components.Button.link.textColor,
          borderColor: 'transparent',
        },
        danger: {
          backgroundColor: theme.components.Button.danger.background,
          color: theme.components.Button.danger.textColor,
          borderColor: theme.components.Button.danger.textColor,
        },
      },
    },
  },
}));

export default Button;
