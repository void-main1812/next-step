import { Ionicons } from '@expo/vector-icons';
import { Link } from '@react-navigation/native';
import Button from 'components/Button';
import Container from 'components/Container';
import Saperator from 'components/Saperator';
import React from 'react';
import { Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { spacing } from 'styles/spacing';
import { typographyStyles } from 'styles/typography';
import { height, width } from 'utils/Size';

const SignUpOptions = ({ navigation }: any) => {
  const { theme, styles } = useStyles(styleSheet);

  return (
    <Container statusBarColor="transparent">
      <View style={styles.container}>
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
        <View style={styles.titleContainer}>
          <Text style={typographyStyles(theme).heading_1}>Register Now</Text>
          <Text style={typographyStyles(theme).body}>Select a method to Register to Next-Step</Text>
        </View>
        <View style={styles.optionsContainer}>
          <Button
            text="Email"
            leftIcon="mail"
            onPress={() => navigation.push('Signup')}
            size="full"
          />
          <Saperator />
          <Button
            text="Google"
            leftIcon="logo-google"
            variant="secondary"
            onPress={() => {}}
            size="full"
          />
          <Button
            text="Apple"
            leftIcon="logo-apple"
            variant="secondary"
            onPress={() => {}}
            size="full"
          />
          <Button
            text="Facebook"
            leftIcon="logo-facebook"
            variant="secondary"
            onPress={() => {}}
            size="full"
          />
        </View>
        <View style={styles.loginNowContainer}>
          <Text style={typographyStyles(theme).body}>Already have an Account ?</Text>
          <Link to={'/Login'}>
            <Text style={styles.loginNowText}>Login Now</Text>
          </Link>
        </View>
      </View>
    </Container>
  );
};

export default SignUpOptions;

const styleSheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: height(6),
    width: '100%',
  },

  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: height(1),
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

  optionsContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: width(5),
    gap: height(2),
  },

  loginNowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: height(1),
  },

  loginNowText: {
    ...typographyStyles(theme).special,
    textDecorationLine: 'underline',
  },
}));
