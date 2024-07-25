import { UnistylesRuntime, createStyleSheet, useStyles } from 'react-native-unistyles';
import { Ionicons } from '@expo/vector-icons';
import { Link } from '@react-navigation/native';
import { OtpVerificationAnimation } from 'animations/OtpVerificationAnimation';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { BlurView } from 'expo-blur';

import Button from 'components/Button';
import Container from 'components/Container';
import Input from 'components/Input';
import { HEIGHT, OVERDRAG } from 'global/Constants';
import { spacing } from 'styles/spacing';
import { typographyStyles } from 'styles/typography';
import { height, width } from 'utils/Size';

import useSignUpUser from 'hooks/authHooks/useSignUpUser';
import useOtpVerification from 'hooks/authHooks/otpVerification';

const AnimatePressable = Animated.createAnimatedComponent(Pressable);

const SignUp = ({ navigation }: any) => {
  const [isPasswordSecured, setIsPasswordSecured] = useState<boolean>(true);

  const { theme, styles } = useStyles(styleSheet);
  const { translateY, Pan } = OtpVerificationAnimation();

  const { setCode, onPressVerify } = useOtpVerification({ navigation });
  const { onSignUpPress, setEmailAddress, setPassword, pendingVerification } = useSignUpUser();

  const AppTheme = UnistylesRuntime.themeName;

  return (
    <GestureHandlerRootView>
      <Container statusBarColor="transparent">
        <SafeAreaView style={styles.container}>
          <Link style={styles.backButton} to={'/SignUpOptions'}>
            <Ionicons
              name="arrow-back"
              color={theme.components.Icons.normal.color}
              size={spacing.icons.large}
            />
          </Link>
          <View style={styles.titleContainer}>
            <Text style={typographyStyles(theme).heading_1}>Create New {`\n`}Account</Text>
            <Text style={typographyStyles(theme).body}>
              Enter your details to create a new account
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Input
              keyboardType="email-address"
              label="Your Email"
              placeholder="username@host.com"
              leftIcon="mail"
              onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
            />
            <Input
              label="Create Password"
              placeholder="kaiWR#w2t"
              leftIcon="lock-closed"
              rightIcon={isPasswordSecured ? 'eye' : 'eye-off'}
              secureTextEntry={isPasswordSecured}
              onRightIconPress={() => setIsPasswordSecured(!isPasswordSecured)}
              onChangeText={(password) => setPassword(password)}
            />
            <Text style={styles.generatePassword}>Generate Strong Password</Text>
            <Button
              text="Verify Email"
              size="full"
              rightIcon="shield-checkmark"
              onPress={onSignUpPress}
            />
          </View>
          <View style={styles.agreementTextContainer}>
            <Text style={styles.agreementText}>
              By Creating an Account you Agree to our{' '}
              <Text style={styles.agreementTextSpecial}>Privacy Policy</Text> &{' '}
              <Text style={styles.agreementTextSpecial}>Terms and Conditions</Text>
            </Text>
          </View>
        </SafeAreaView>
      </Container>

      {pendingVerification && (
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
                <View style={styles.otpContainer}>
                  <View style={{ gap: height(1) }}>
                    <Text style={typographyStyles(theme).heading_2}>Verify your Email Id</Text>
                    <Text style={typographyStyles(theme).body}>
                      We have sent an OTP in a mail to your entered E-mail Id please enter the given
                      OTP to verify your E-Mail Id
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

  otpContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: height(5),
    width: '100%',
    zIndex: 2,
  },

  backButton: {
    padding: height(4),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    top: height(2),
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: height(6),
    width: '100%',
  },

  titleContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: height(1),
    width: '100%',
    paddingHorizontal: width(5),
  },

  inputContainer: {
    width: '100%',
    gap: height(3),
    paddingHorizontal: width(5),
  },

  generatePassword: {
    ...typographyStyles(theme).special,
    textDecorationLine: 'underline',
    textAlign: 'right',
  },

  agreementTextContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width(12),
    marginTop: height(2),
  },

  agreementText: {
    ...typographyStyles(theme).body,
    textAlign: 'center',
    lineHeight: height(3),
  },

  agreementTextSpecial: {
    ...typographyStyles(theme).special,
    textDecorationLine: 'underline',
  },
}));
