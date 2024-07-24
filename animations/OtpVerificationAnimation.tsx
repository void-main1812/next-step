import { HEIGHT, OVERDRAG } from 'global/Constants';
import { useState } from 'react';
import { Gesture } from 'react-native-gesture-handler';
import { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export const OtpVerificationAnimation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const offset = useSharedValue(0);

  const toggleSheet = () => {
    setIsOpen(!isOpen);
    offset.value = 0;
  };

  const Pan = Gesture.Pan()
    .onChange((event) => {
      const offsetData = event.changeY + offset.value;

      const clamp = Math.max(-OVERDRAG, offsetData);
      offset.value = offsetData > 0 ? offsetData : withTiming(clamp);
    })
    .onFinalize(() => {
      if (offset.value < HEIGHT / 3) {
        offset.value = withTiming(0);
      } else {
        offset.value = withTiming(HEIGHT, {}, () => {
          runOnJS(toggleSheet)();
        });
      }
    });

  const translateY = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));

  return { Pan, translateY, toggleSheet };
};
