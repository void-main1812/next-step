import { View, Text, Pressable, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { UnistylesRuntime, createStyleSheet, useStyles } from 'react-native-unistyles';
import { HEIGHT, OVERDRAG } from 'global/Constants';
import { height, width } from 'utils/Size';
import { GestureDetector } from 'react-native-gesture-handler';
import { OtpVerificationAnimation } from 'animations/OtpVerificationAnimation';
import { BlurView } from 'expo-blur';
import { typographyStyles } from 'styles/typography';
import Input from './Input';
import Button from './Button';
import { useSignUp } from '@clerk/clerk-expo';

const AnimatePressable = Animated.createAnimatedComponent(Pressable);

const OtpVerificationDialog = ({navigation}: {navigation:any}) => {
  const [code, setCode] = useState('');
  const { isLoaded, signUp, setActive } = useSignUp();


  const { translateY, Pan } = OtpVerificationAnimation();
  const { theme, styles } = useStyles(styleSheet);

  const AppTheme = UnistylesRuntime.themeName;

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        navigation.replace('HomeNavigator');
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <AnimatePressable style={styles.backdrop} entering={FadeIn} exiting={FadeOut}>
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
                  We have sent an OTP in a mail to your entered E-mail Id please enter the given OTP
                  to verify your E-Mail Id
                </Text>
              </View>
              <View style={{ width: '100%', gap: height(4) }}>
                <Input
                  label="Enter OTP"
                  placeholder="OTP"
                  leftIcon="key"
                  onChangeText={(code) => setCode(code)}
                />
                <Button
                  text="Verify OTP"
                  size="full"
                  enableRipple={true}
                  rightIcon="checkmark"
                  onPress={onPressVerify}
                />
              </View>
            </View>
          </BlurView>
        </Animated.View>
      </GestureDetector>
    </AnimatePressable>
  );
};

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

export default OtpVerificationDialog;
