import { createStyleSheet } from 'react-native-unistyles';
import { spacing } from './spacing';

export const typographyStyles = createStyleSheet((theme) => ({
  title: {
    fontSize: spacing.height[10],
    fontFamily: 'ClashDisplay-Semibold',
    color: theme.components.Text.title,
  },
  heading_1: {
    fontSize: spacing.height[9],
    fontFamily: 'ClashDisplay-Semibold',
    color: theme.components.Text.heading_1,
  },
  heading_2: {
    fontSize: spacing.height[8],
    fontFamily: 'ClashDisplay-Medium',
    color: theme.components.Text.heading_2,
  },
  heading_3: {
    fontSize: spacing.height[6],
    fontFamily: 'ClashDisplay-Medium',
    color: theme.components.Text.heading_3,
  },
  special: {
    fontSize: spacing.height.special,
    fontFamily: 'ClashDisplay-Semibold',
    color: theme.components.Text.special,
  },
  body: {
    fontSize: spacing.height[4],
    fontFamily: 'Montserrat-Medium',
    color: theme.components.Text.body,
  },
  body_small: {
    fontSize: spacing.height[3],
    fontFamily: 'Montserrat-Medium',
    color: theme.components.Text.body_small,
  },
}));
