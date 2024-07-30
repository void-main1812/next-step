import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { spacing } from 'styles/spacing';
import { typographyStyles } from 'styles/typography';
import Ionicons from '@expo/vector-icons/Ionicons';
import { height } from 'utils/Size';

type ChipsProps = {
  chipText?: string;
  variant?: 'normal' | 'favourable';
  icon?: keyof typeof Ionicons.glyphMap;
  onpress?: () => void;
};

export const Chips = ({ chipText = 'Your Text', variant = 'normal', icon }: ChipsProps) => {
  const { styles, theme } = useStyles(styleSheet, { color: variant });

  return (
    <View style={styles.chipContainer}>
      {icon && (
        <Ionicons
          name={icon}
          size={spacing.icons.medium}
          color={theme.components.Chip[variant].color}
        />
      )}
      <Text style={styles.chipText}>{chipText}</Text>
    </View>
  );
};

export const RemoveableChips = ({
  chipText = 'Your Text',
  variant = 'normal',
  onpress,
}: ChipsProps) => {
  const { styles, theme } = useStyles(styleSheet, { color: variant });

  return (
    <View style={styles.chipContainer}>
      <Text style={styles.chipText}>{chipText}</Text>
      <Pressable onPress={onpress}>
        <Ionicons
          name="close-circle"
          size={spacing.icons.medium}
          color={theme.components.Chip[variant].color}
        />
      </Pressable>
    </View>
  );
};

const styleSheet = createStyleSheet((theme) => ({
  chipContainer: {
    borderRadius: spacing.height[2],
    minHeight: height(5),
    paddingHorizontal: spacing.height[6],
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    alignItems: 'center',
    gap: spacing.height[2],
    variants: {
      color: {
        normal: {
          backgroundColor: theme.components.Chip.normal.background,
        },
        favourable: {
          backgroundColor: theme.components.Chip.favourable.background,
        },
      },
    },
  },
  chipText: {
    ...typographyStyles(theme).body,
    variants: {
      color: {
        normal: {
          color: theme.components.Chip.normal.color,
        },
        favourable: {
          color: theme.components.Chip.favourable.color,
        },
      },
    },
  },
}));
