import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { spacing } from 'styles/spacing';
import { typographyStyles } from 'styles/typography';
import Alert from './Alert';
import Button from './Button';
import Icons from './Icons';

export type DialogBoxProps = {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  message?: string;
  alertType?: 'danger' | 'warning' | 'info';
  alertString?: string;
  buttonText?: string;
  secondaryButtonText?: string;
  primaryButtonSize?: 'full' | 'normal' | 'icon';
  secondaryButtonSize?: 'full' | 'normal' | 'icon';
  primaryButtonIcon?: keyof typeof Ionicons.glyphMap;
  secondaryButtonIcon?: keyof typeof Ionicons.glyphMap;
  onPrimaryButtonPress?: () => void;
  onSecondaryButtonPress?: () => void;
  onClose?: () => void;
};

const sampleMessage =
  'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam voluptates similique commodi dolorum maiores quo cupiditate.';

const DialogBox = ({
  icon,
  title = 'Title Here',
  message = sampleMessage,
  alertType = 'info',
  alertString,
  buttonText = 'Button Text',
  secondaryButtonText,
  primaryButtonSize = 'full',
  secondaryButtonSize,
  primaryButtonIcon,
  secondaryButtonIcon,
  onPrimaryButtonPress,
  onSecondaryButtonPress,
  onClose,
}: DialogBoxProps) => {
  const { styles } = useStyles(stylesheet);

  const renderSecondaryButton = secondaryButtonText || secondaryButtonIcon;

  return (
    <View style={styles.Container}>
      <View style={styles.closeButton}>
        <Button leftIcon="close" variant="link" size="icon" onPress={onClose} />
      </View>
      <View style={styles.headingContainer}>
        {icon && <Icons name={icon} showBackground variant="normal" size="medium" />}
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.MessageContainer}>
        <Text style={styles.dialogueBoxMessage}>{message}</Text>
      </View>
      {alertString && (
        <View style={styles.MessageContainer}>
          <Alert alertMessage={alertString} variant={alertType} />
        </View>
      )}
      <View style={styles.ButtonContainer}>
        <Button
          text={buttonText}
          size={primaryButtonSize}
          enableRipple
          rightIcon={primaryButtonIcon}
          variant="secondary"
          onPress={onPrimaryButtonPress}
        />
        {renderSecondaryButton && (
          <Button
            text={secondaryButtonText}
            size={secondaryButtonSize}
            enableRipple
            rightIcon={secondaryButtonIcon}
            variant="link"
            onPress={onSecondaryButtonPress}
          />
        )}
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  closeButton: {
    position: 'absolute',
    right: spacing.height[2],
    top: spacing.height[2],
  },
  Container: {
    backgroundColor: theme.components.DialogueBox.backgroundColor,
    borderRadius: spacing.height[4],
    elevation: 50,
    shadowColor: theme.components.DialogueBox.shadowColor,
    paddingHorizontal: spacing.height[6],
    paddingVertical: spacing.height[8],
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.height[6],
    width: '100%',
  },
  headingContainer: {
    gap: spacing.height[4],
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...typographyStyles(theme).heading_3,
  },
  dialogueBoxMessage: {
    ...typographyStyles(theme).body_small,
  },
  MessageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  ButtonContainer: {
    width: '100%',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    gap: spacing.height[4],
  },
}));

export default DialogBox;
