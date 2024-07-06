import { BlurView } from 'expo-blur';
import { HEIGHT, OVERDRAG } from 'global/Constants';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { UnistylesRuntime, createStyleSheet, useStyles } from 'react-native-unistyles';
import { height, width } from 'utils/Size';
import SignUpForm from './SignupForm';
import { typographyStyles } from 'styles/typography';
import Input from 'components/Input';
import Button from 'components/Button';

const AnimatePressable = Animated.createAnimatedComponent(Pressable);

const SignUp = ({ navigation }: any) => {
  const { theme, styles } = useStyles(styleSheet);

  const navigatieToApiOptions = () => {
    navigation.navigate('RapidApi');
  };

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

  const AppTheme = UnistylesRuntime.themeName;

  return (
    <GestureHandlerRootView>
      <SignUpForm toggleSheet={toggleSheet} />
      {isOpen && (
        <>
          <AnimatePressable
            style={styles.backdrop}
            entering={FadeIn}
            exiting={FadeOut}
            onPress={toggleSheet}>
            <GestureDetector gesture={Pan}>
              <Animated.View
                style={[styles.sheet, translateY]}
                entering={SlideInDown.springify().damping(15)}
                exiting={SlideOutDown}>
                <BlurView
                  experimentalBlurMethod="dimezisBlurView"
                  intensity={90}
                  style={styles.blurContainer}
                  tint={AppTheme}>
                  <View style={styles.container}>
                    <View style={{ gap: height(1) }}>
                      <Text style={typographyStyles(theme).heading_2}>Verify your Email Id</Text>
                      <Text style={typographyStyles(theme).body}>
                        We have sent an OTP in a mail to your entered E-mail Id please enter the
                        given OTP to verify your E-Mail Id
                      </Text>
                    </View>
                    <View style={{ width: '100%', gap: height(4) }}>
                      <Input label="Enter OTP" placeholder="OTP" leftIcon="key" />
                      <Button
                        text="Verify OTP"
                        size="full"
                        enableRipple={true}
                        rightIcon="checkmark"
                        onPress={navigatieToApiOptions}
                      />
                    </View>
                  </View>
                </BlurView>
              </Animated.View>
            </GestureDetector>
          </AnimatePressable>
        </>
      )}
    </GestureHandlerRootView>
  );
};

export default SignUp;

const styleSheet = createStyleSheet((theme) => ({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.components.backdrop.backgroundColor,
    zIndex: 1,
  },

  sheet: {
    minHeight: HEIGHT,
    width: '100%',
    position: 'absolute',
    bottom: -OVERDRAG * 1.1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 1,
    overflow: 'hidden',
  },

  blurContainer: {
    minHeight: HEIGHT,
    width: '100%',
    paddingVertical: height(5),
    paddingHorizontal: width(5),
    zIndex: 1,
  },

  container: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: height(5),
    width: '100%',
    zIndex: 2,
  },
}));
