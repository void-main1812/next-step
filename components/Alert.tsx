import { View, Text } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { spacing } from 'styles/spacing';
import Icons from './Icons';
import { Ionicons } from '@expo/vector-icons';
import { typographyStyles } from 'styles/typography';
import { height } from 'utils/Size';

type AlertProps = {
  variant?: 'warning' | 'info' | 'danger';
  alertMessage: string;
};

const Alert = ({ variant = 'info', alertMessage }: AlertProps) => {
  // destructuring the theme and styles from the useStyles hook
  const { styles } = useStyles(styleSheet, {
    color: variant,
  });

  // icon color variant for the Alert component
  const icon_name: { [key in 'warning' | 'info' | 'danger']: keyof typeof Ionicons.glyphMap } = {
    warning: 'checkmark-circle',
    info: 'information-circle',
    danger: 'alert-circle',
  };

  return (
    <View style={styles.alertContainer}>
      <Icons name={icon_name[variant]} variant={variant} size="small" />
      <Text style={styles.alertMessage}>{alertMessage}</Text>
    </View>
  );
};

const styleSheet = createStyleSheet((theme) => ({
  alertContainer: {
    width: '100%',
    height: height(4.2),
    paddingHorizontal: spacing.height[1],
    borderRadius: spacing.height[2],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',

    // Variants for Alert component background and border color
    variants: {
      color: {
        warning: {
          backgroundColor: theme.components.Icons.warning.background,
          borderColor: theme.components.Icons.warning.color,
        },
        info: {
          backgroundColor: theme.components.Icons.info.background,
          borderColor: theme.components.Icons.info.color,
        },
        danger: {
          backgroundColor: theme.components.Icons.danger.background,
          borderColor: theme.components.Icons.danger.color,
        },
      },
    },
  },

  alertMessage: {
    ...typographyStyles(theme).body,

    // Variants for Alert component text color
    variants: {
      color: {
        warning: {
          color: theme.components.Icons.warning.color,
        },
        info: {
          color: theme.components.Icons.info.color,
        },
        danger: {
          color: theme.components.Icons.danger.color,
        },
      },
    },
  },
}));

export default Alert;
