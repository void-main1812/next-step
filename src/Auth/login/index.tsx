import { useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { Link } from '@react-navigation/native';
import Button from 'components/Button';
import Container from 'components/Container';
import Input from 'components/Input';
import Saperator from 'components/Saperator';
import { SocialAuthButtonCompact } from 'components/SocialAuthButton';
import useSignInPress from 'hooks/authHooks/useSignInPress';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { spacing } from 'styles/spacing';
import { typographyStyles } from 'styles/typography';
import { height, width } from 'utils/Size';

const Login = ({ navigation }: any) => {
  const { theme, styles } = useStyles(styleSheet);

  const [isPasswordSecured, setIsPasswordSecured] = useState<boolean>(true);

  const { onSignInPress, setEmailAddress, setPassword, isLoading } = useSignInPress(navigation);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      navigation.navigate('RootNavigator');
    }
  }, [isSignedIn]);

  return (
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
          <Input
            label="Email"
            keyboardType="email-address"
            placeholder="johnDoe@gmail.com"
            leftIcon="mail"
            onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
          />
          <Input
            secureTextEntry={isPasswordSecured}
            onRightIconPress={() => setIsPasswordSecured(!isPasswordSecured)}
            label="Password"
            placeholder="ki@K847S"
            leftIcon="lock-closed"
            rightIcon={isPasswordSecured ? 'eye' : 'eye-off'}
            onChangeText={(password) => setPassword(password)}
          />
          <Text style={styles.forgotPasswordContainer}>Forgot Password</Text>
          <Button
            text="Login"
            size="full"
            rightIcon="arrow-forward"
            isLoading={isLoading}
            onPress={onSignInPress}
          />
          <View style={styles.createAccountContainer}>
            <Text style={typographyStyles(theme).body}>Don't have an Account?</Text>
            <Link to="/SignUpOptions">
              {' '}
              <Text style={[typographyStyles(theme).special, { textDecorationLine: 'underline' }]}>
                Create One
              </Text>
            </Link>
          </View>
        </View>
        <Saperator text="or continue with" />
        <View style={styles.socialAuthButtonContainer}>
          <SocialAuthButtonCompact
            provider="oauth_facebook"
            icon={require('../../../assets/socialIcons/Facebook.png')}
          />
          <SocialAuthButtonCompact
            provider="oauth_github"
            icon={require('../../../assets/socialIcons/Github.png')}
          />
          <SocialAuthButtonCompact
            provider="oauth_google"
            icon={require('../../../assets/socialIcons/Google.png')}
          />
        </View>
      </View>
    </Container>
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
