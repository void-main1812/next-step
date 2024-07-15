import { View, Text } from 'react-native';
import React, { useState } from 'react';
import Container from 'components/Container';
import { Ionicons } from '@expo/vector-icons';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { spacing } from 'styles/spacing';
import { Link } from '@react-navigation/native';
import { height, width } from 'utils/Size';
import { SafeAreaView } from 'react-native-safe-area-context';
import { typographyStyles } from 'styles/typography';
import Input from 'components/Input';
import Button from 'components/Button';

type SignUpFormProps = {
  onSignUpPress: () => void;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
};

const SignUpForm = ({onSignUpPress, onEmailChange, onPasswordChange}: SignUpFormProps) => {

  const { theme, styles } = useStyles(styleSheet);

  const [isPasswordSecured, setIsPasswordSecured] = useState<boolean>(true);
  

  return (
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
            onChangeText={onEmailChange}
          />
          <Input
            label="Create Password"
            placeholder="kaiWR#w2t"
            leftIcon="lock-closed"
            rightIcon={isPasswordSecured ? 'eye' : 'eye-off'}
            secureTextEntry={isPasswordSecured}
            onRightIconPress={() => setIsPasswordSecured(!isPasswordSecured)}
            onChangeText={onPasswordChange}
          />
          <Text style={styles.generatePassword}>Generate Strong Password</Text>
          <Button
            text="Verify Email"
            size="full"
            rightIcon="shield-checkmark"
            onPress={() => onSignUpPress()}
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
  );
};

export default SignUpForm;

const styleSheet = createStyleSheet((theme) => ({
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
