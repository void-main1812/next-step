import { Ionicons } from '@expo/vector-icons';
import { Link } from '@react-navigation/native';
import Button from 'components/Button';
import Container from 'components/Container';
import Input from 'components/Input';
import Saperator from 'components/Saperator';
import SocialAuthButton from 'components/SocialAuthButton';
import React from 'react';
import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { spacing } from 'styles/spacing';
import { typographyStyles } from 'styles/typography';
import { height, width } from 'utils/Size';
import Animated from 'react-native-reanimated';

const Login = () => {
  const { theme, styles } = useStyles(styleSheet);

  return (
    <>
      <Container scrollable={false} statusBarColor="transparent">
        <View style={styles.container}>
          <View>
            <Animated.View sharedTransitionTag="appTitle" style={styles.appTitleContainer}>
              <View style={styles.logoContainer}>
                <Ionicons
                  name="briefcase"
                  size={height(4)}
                  style={{ transform: [{ rotateZ: '-10deg' }] }}
                  color={theme.components.Icons.normal.color}
                />
              </View>
              <Text style={typographyStyles(theme).heading_2}>Next Step</Text>
            </Animated.View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.titleContainer}>
              <Text style={typographyStyles(theme).heading_1}>Welcome</Text>
              <Text style={typographyStyles(theme).body}>Please Login to Continue</Text>
            </View>
            <Input label="Email" placeholder="johnDoe@gmail.com" leftIcon="mail" />
            <Input
              secureTextEntry
              label="Password"
              placeholder="ki@K847S"
              leftIcon="lock-closed"
              rightIcon="eye"
            />
            <Text style={styles.forgotPasswordContainer}>Forgot Password</Text>
            <Button text="Login" size="full" rightIcon="arrow-forward" />
            <View style={styles.createAccountContainer}>
              <Text style={typographyStyles(theme).body}>Don't have an Account?</Text>
              <Link to={'/SignUpOptions'}>
                {' '}
                <Text
                  style={[typographyStyles(theme).special, { textDecorationLine: 'underline' }]}>
                  Create One
                </Text>
              </Link>
            </View>
          </View>
          <Saperator text="or continue with" />
          <View style={styles.socialAuthButtonContainer}>
            <SocialAuthButton icon={require('../../../assets/socialIcons/Facebook.png')} />
            <SocialAuthButton icon={require('../../../assets/socialIcons/Apple.png')} />
            <SocialAuthButton icon={require('../../../assets/socialIcons/Google.png')} />
          </View>
        </View>
      </Container>
    </>
  );
};

export default Login;

const styleSheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width(5),
    gap: height(6),
  },

  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: height(8),
    width: height(8),
    backgroundColor: theme.components.Icons.normal.background,
    borderRadius: spacing.height[2],
  },

  appTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: height(2),
  },

  titleContainer: {
    gap: spacing.height[2],
  },

  inputContainer: {
    width: '100%',
    gap: spacing.height[6],
  },

  forgotPasswordContainer: {
    ...typographyStyles(theme).body,
    width: '100%',
    alignItems: 'center',
    textAlign: 'right',
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
  },

  createAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: height(1),
  },

  socialAuthButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: width(10),
  },
}));
