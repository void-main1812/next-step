import React, { useEffect } from 'react';
import { Modal } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { height, width } from 'utils/Size';
import DialogBox, { DialogBoxProps } from './DialogBox';

type DialogModalProps = DialogBoxProps & {
  isVisible: boolean;
  hide: () => void;
};

const DialogModal = ({
  icon,
  title = 'Title Here',
  message,
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
  isVisible,
  hide,
}: DialogModalProps) => {
  const { styles } = useStyles(styleSheet);

  const opacity = useSharedValue<number>(0);
  const translateY = useSharedValue<number>(height(50));
  const scale = useSharedValue<number>(0.5);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }, { scale: scale.value }],
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      opacity.value = withTiming(1, { duration: 100 });
      translateY.value = withTiming(0, { duration: 100 });
      scale.value = withTiming(1, { duration: 100 });
    } else {
      opacity.value = withTiming(0);
      translateY.value = withTiming(height(50));
      scale.value = withTiming(0.5);
    }
  }, [isVisible]);

  const handleClose = () => {
    opacity.value = withTiming(0);
    translateY.value = withTiming(height(50));
    scale.value = withTiming(0.5);
    setTimeout(() => {
      hide();
    }, 100);
  };

  return (
    <Modal animationType="none" transparent visible={isVisible} onRequestClose={handleClose}>
      <Animated.View style={[styles.modalcontainer, reanimatedStyle]}>
        <DialogBox
          icon={icon}
          title={title}
          message={message}
          alertType={alertType}
          alertString={alertString}
          buttonText={buttonText}
          secondaryButtonText={secondaryButtonText}
          primaryButtonSize={primaryButtonSize}
          secondaryButtonSize={secondaryButtonSize}
          primaryButtonIcon={primaryButtonIcon}
          secondaryButtonIcon={secondaryButtonIcon}
          onPrimaryButtonPress={onPrimaryButtonPress}
          onSecondaryButtonPress={onSecondaryButtonPress || handleClose}
          onClose={handleClose}
        />
      </Animated.View>
    </Modal>
  );
};

export default DialogModal;

const styleSheet = createStyleSheet(() => ({
  modalcontainer: {
    height: height(100),
    width: width(100),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width(10),
  },
}));
